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
      subject: "Thanks for contacting SociallyConnect",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hi ${name}, 👋</h2>
          <p>Thank you for contacting <strong>SociallyConnect</strong>.</p>
          <p>We’ll get back to you within <strong>24–48 hours</strong>.</p>

          <hr/>

          <p><strong>Your message:</strong></p>
          <div style="
            background:#f4f6f8;
            padding:12px;
            border-left:4px solid #2563eb;
            border-radius:6px;
          ">
            ${message}
          </div>

          <p>Regards,<br/><strong>SociallyConnect Team</strong> 💙</p>
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
