const axios = require("axios");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "SociallyConnect",
          email: process.env.BREVO_FROM_EMAIL,
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "BREVO EMAIL ERROR:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = sendEmail;
