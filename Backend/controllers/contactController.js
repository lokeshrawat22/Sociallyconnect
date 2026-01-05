const Contact = require("../models/Contactus");
const sendEmail = require("../utils/sendEmail");
exports.contactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message received successfully",
    });

   sendEmail({
  to: email,
  subject: "We’ve received your message – SociallyConnect",
  html: `
    <div style="
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f9fafb;
      padding: 30px;
    ">
      <div style="
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
      ">

        <h2 style="color:#111827; margin-bottom: 10px;">
          Hi ${name}, 👋
        </h2>

        <p style="color:#374151; font-size:15px;">
          Thank you for reaching out to <strong>SociallyConnect</strong>.
          We’ve successfully received your message.
        </p>

        <p style="color:#374151; font-size:15px;">
          Our support team will review it and get back to you within
          <strong>24–48 hours</strong>.
        </p>

        <hr style="margin: 25px 0;" />

        <p style="font-size:14px; color:#111827;">
          <strong>Your message:</strong>
        </p>

        <div style="
          background: #f4f6f8;
          padding: 14px 16px;
          border-left: 4px solid #4f46e5;
          border-radius: 6px;
          color: #374151;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
        ">
          ${message}
        </div>

        <p style="font-size:13px; color:#6b7280;">
          ℹ️ Please note: This is an automated confirmation email.
          You don’t need to reply to this message.
        </p>

        <p style="font-size:13px; color:#6b7280;">
          If you didn’t submit this request, you can safely ignore this email.
        </p>

        <p style="margin-top: 30px; color:#374151; font-size:14px;">
          Regards,<br/>
          <strong>SociallyConnect Support Team</strong>
        </p>

        <p style="
          margin-top: 10px;
          font-size: 12px;
          color: #9ca3af;
        ">
          © ${new Date().getFullYear()} SociallyConnect. All rights reserved.
        </p>

      </div>
    </div>
  `,
}).catch(err => {
  console.error("EMAIL ERROR:", err);
});


  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
