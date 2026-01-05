const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `SociallyConnect <${process.env.EMAIL_FROM}>`, 
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent via Resend ✅", data?.id);
    return data;
  } catch (err) {
    console.error("SendEmail failed ❌", err.message);
    throw err;
  }
};

module.exports = sendEmail;
