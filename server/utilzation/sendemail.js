import Mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_API_SECRET) {
  throw new Error("Missing Mailjet API credentials.");
}

const mailjetClient = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

export const sendRegistrationEmail = async (userEmail, userName, postTitle) => {
  if (!userEmail || !userName) {
    throw new Error("Invalid recipient details.");
  }

  try {
    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "skirankumar97849@gmail.com",
            Name: "WakeUpRobo",
          },
          To: [
            {
              Email: userEmail,
              Name: userName,
            },
          ],
          Subject: "Registration Successful",
          TextPart: `Dear ${userName},\n\nThank you for registering with WakeUpRobo! We are excited to have you on board for the ${postTitle} and look forward to supporting you throughout your learning journey.
          \n\nCourse Name: ${postTitle}\n\nFor further updates or any queries, feel free to contact us:\n\nMobile: 7639999740\nInstagram: @wakeuprobo.com_ (https://www.instagram.com/wakeuprobo.com_)\nEmail: wakeuprobotech@gmail.com\nEmail: xmaxconnects@gmail.com\n\nVisit our website: https://wakeuprobo.com\n\n© 2025 WakeUpRobo. All rights reserved.`,
          HTMLPart: `<!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>Welcome to WakeUpRobo!</title>
              <style>
                  body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333; }
                  .container { max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
                  .header { font-size: 24px; font-weight: bold; text-align: center; color: #333; }
                  .content { font-size: 16px; padding: 10px 0; }
                  .contact-info { padding: 10px 0; font-size: 16px; color: #555; }
                  .button-container { text-align: center; margin-top: 20px; }
                  .button { background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; display: inline-block; }
                  .footer { font-size: 14px; text-align: center; color: #777; margin-top: 20px; }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">Welcome to WakeUpRobo!</div>
                  <div class="content">
                      Dear ${userName},<br><br>
                      Thank you for registering with <strong>WakeUpRobo!</strong> We are excited to have you on board for the <strong>${postTitle}</strong> and look forward to supporting you throughout your learning journey.
                  </div>
                  <div class="content"><strong>Course Name:</strong> ${postTitle}</div>
                  <div class="content">For further updates or any queries, feel free to contact us:</div>
                  <div class="contact-info">
                      <strong>Mobile:</strong> 7639999740<br>
                      <strong>Instagram:</strong> <a href="https://www.instagram.com/wakeuprobo.com_" style="color: #1a73e8;">@wakeuprobo.com_</a><br>
                      <strong>Email:</strong> <a href="mailto:wakeuprobotech@gmail.com" style="color: #1a73e8;">wakeuprobotech@gmail.com</a><br>
                      <strong>Email:</strong> <a href="mailto:xmaxconnects@gmail.com" style="color: #1a73e8;">xmaxconnects@gmail.com</a>
                  </div>
                  <div class="button-container">
                      <a href="https://wakeuprobo.com" class="button">Visit Our Website</a>
                  </div>
                  <div class="footer">© 2025 WakeUpRobo. All rights reserved.</div>
              </div>
          </body>
          </html>`,
        },
      ],
    });

    const response = await request.then(res => res.body);
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message || error);
    return false;
  }
};
