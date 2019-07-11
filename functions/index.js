const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// const config = require("./config.json");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/form", (req, res) => {
  const { name, email, message } = req.body;
  nodemailer.createTestAccount((error, account) => {
    const htmlEmail = `
      <h4>Contact Details</h4>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
      </ul>
      <h3>Message</h3>
      <p>${message}</p>
    `;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ENTER_EMAIL_HERE",
        pass: "ENTER_PASSWORD_HERE"
      }
    });

    let mailOptions = {
      from: "ENTER_EMAIL_HERE",
      to: "ENTER_EMAIL_HERE",
      replyTo: email,
      subject: `Portfolio - Contact: ${name}`,
      text: message,
      html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error on server", err);
        res.send("fail");
      } else {
        console.log("Message sent!", info);
        res.send("success");
      }
    });
  });
});

exports.app = functions.https.onRequest(app);
