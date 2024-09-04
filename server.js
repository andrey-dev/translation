const { log } = require('console');
const express = require('express');
const path = require('path');
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "sid.garbage.mail@gmail.com",
    pass: "jlif onjc zvey ifdt",
    // pass: "garbage/*-+01",
  },
});

app.use(express.json());
app.use("/font", express.static(__dirname + "/font"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/styles", express.static(__dirname + "/styles"));
app.use("/src", express.static(__dirname + "/src"));

app.get('/', (req, res) => {
  // res.send('Welcome to my server!');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/request', (req, res) => {
  console.log('POST request with ', req.body);
  (async () => {
    const result = await sendEmail(req.body);
    res.json({success : result});
    res.end();
  })();
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function sendEmail(body) {
  const mailOptions = {
    from: '"Sid Freeman" <sid.garbage.mail@gmail.com>',
    to: "agolovin.dev@gmail.com",
    subject: `✔ New order from ${body.name} ✔`,
    text: `
    name: ${body.name}
    phone: ${body.phone}
    email: ${body.email}
    
    comment: ${body.comment}
    `,
  };

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Failed to send an email', error);
        resolve(false);
      } else {
        console.info('Email sent', info);
        resolve(true);
      }
    });
  });
}
