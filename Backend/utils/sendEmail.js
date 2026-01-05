const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  await resend.emails.send({
    from: `SociallyConnect <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent via Resend");
};

module.exports = sendEmail;
