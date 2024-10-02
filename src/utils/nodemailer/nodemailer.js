import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "zubayer.mh@gmail.com",
    pass: "ktfpluxhseypaxuc",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendVerificationMail(email, code) {
  try {
    const text = "Your Email Verification code is " + code
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'zubayer.mh@gmail.com', // sender address
      to: email, // list of receivers
      subject: "LumaraCode Email Verification", // Subject line
      text, // plain text body
      html: `<p>Your Email Verification code is <span style="color: green; font-weight: bold" >${code}</span></p>`
    });

    console.log("Message sent: %s", info);
  } catch (e) {
    console.log("Err: ", e)
  }
}