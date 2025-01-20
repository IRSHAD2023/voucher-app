const express = require('express');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const router = express.Router();
const db = require('../models/db');

// Route to generate QR code
router.get('/generateQRCode', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  const randomCode = Math.floor(Math.random() * 10000000000); // Generate random 10-digit code
  const generatedDate = new Date();
  const expiryDate = new Date(generatedDate); 
  expiryDate.setMonth(expiryDate.getMonth() + 1); // Set expiry to one month from today

  QRCode.toDataURL(randomCode.toString(), (err, url) => {
    if (err) {
      return res.send('Error generating QR Code');
    }

    const query = `
      INSERT INTO vouchers (code, generated_date, expiry_date)
      VALUES ($1, $2, $3)
    `;
    const values = [randomCode, generatedDate.toISOString(), expiryDate.toISOString()];

    db.query(query, values)
      .then(() => {
        res.redirect('/dashboard'); // Redirect to dashboard after QR code generation
      })
      .catch(() => {
        res.send('Database error');
      });
  });
});


// Route to generate PDF
router.get('/generatePDF/:voucherCode', (req, res) => {
  const voucherCode = req.params.voucherCode;

  const query = 'SELECT * FROM vouchers WHERE code = $1';
  db.query(query, [voucherCode])
    .then(result => {
      if (result.rows.length === 0) {
        return res.send('Voucher not found');
      }

      const voucher = result.rows[0];
      const doc = new PDFDocument();
      const pdfPath = `./public/vouchers/${voucherCode}.pdf`;

      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);

      doc
        .fontSize(20)
        .text('Voucher', { align: 'center' })
        .moveDown()
        .fontSize(14)
        .text(`Voucher Code: ${voucher.code}`)
        .text(`Generated Date: ${voucher.generated_date}`)
        .text(`Expiry Date: ${voucher.expiry_date}`)
        .moveDown();

      QRCode.toDataURL(voucher.code.toString(), (err, url) => {
        if (!err) {
          const buffer = Buffer.from(url.split(',')[1], 'base64');
          doc.image(buffer, {
            fit: [200, 200],
            align: 'center',
            valign: 'center',
          });
        }

        doc.end();

        writeStream.on('finish', () => {
          res.download(pdfPath, `${voucherCode}.pdf`, (err) => {
            if (err) console.error('Error downloading PDF:', err);
            fs.unlinkSync(pdfPath);
          });
        });
      });
    })
    .catch(() => {
      res.send('Database error');
    });
});

module.exports = router;
