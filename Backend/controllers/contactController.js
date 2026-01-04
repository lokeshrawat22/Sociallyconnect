const Contact = require("../models/Contactus");
const sendEmail = require("../utils/sendEmail");

exports.contactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Save to DB
    await Contact.create({
      name,
      email,
      message,
    });

    // ✅ Send thank-you email WITH USER MESSAGE
    await sendEmail({
      to: email,
      subject: "Thanks for contacting SociallyConnect",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hi ${name}, 👋</h2>

          <p>
            Thank you for contacting <strong>SociallyConnect</strong>.
          </p>

          <p>
            We have received your message and our team will get back to you within
            <strong>24–48 hours</strong>.
          </p>

          <hr style="margin: 20px 0;" />

          <p><strong>Your message:</strong></p>

          <div style="
            background: #f4f6f8;
            padding: 12px 16px;
            border-left: 4px solid #2563eb;
            border-radius: 6px;
            color: #333;
          ">
            ${message}
          </div>

          <br/>

          <p>
            Regards,<br/>
            <strong>SociallyConnect Team</strong> 💙
          </p>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message received successfully",
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
