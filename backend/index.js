const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express();
app.use(cors())
app.use(express.json())

dotenv.config()

const PORT = process.env.PORT || 3000

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "garvitpriyansh@gmail.com",
        pass: `${process.env.PASSWORD}`
    },
    secure: true,
    port: 465
});



app.post('/mail', async (req, res) => {
    const emailId = req.body.email
    try {
        const info = await transporter.sendMail({
            from: "garvitpriyansh@gmail.com ",
            to: `${emailId}`,
            subject: "From Garvit-Priyansh Website",
            // text: "Thank you for being a part of our jounrney", // plain‑text body
            html: `<div style="font-family: 'Segoe UI', sans-serif; background: #f4f4f7; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);">
      <div style="background: linear-gradient(90deg, #667eea, #764ba2); padding: 20px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Thank You for Subscribing! 🌟</h1>
      </div>
      <div style="padding: 30px; color: #333;">
        <p style="font-size: 16px; line-height: 1.6;">
          Hello there! 👋<br><br>
          We're absolutely thrilled to welcome you to our community. Thank you for subscribing and being a part of our journey. Your support means the world to us! 💖
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          Stay tuned for updates, inspiration, and a lot more awesome stuff coming your way.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <img src="https://res.cloudinary.com/doyifognr/image/upload/v1749885946/nims_2_bkczxp.jpg" alt="Thank You" style="max-width: 100%; border-radius: 8px;" />
        </div>
        <p style="font-size: 16px; line-height: 1.6;">
          With gratitude,<br>
          <strong>Garvit - Priyansh</strong><br>
          <em>Your Music Buddies 🚀</em>
        </p>
      </div>
      <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        You are receiving this email because you subscribed to our newsletter.
      </div>
    </div>
  </div>' />`,
        })
        res.status(200).json({
            message: "Mail sent",
            id: info.messageId
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            err: error
        })
    }
})

app.listen(PORT, () => {
    console.log('App Started')
})



