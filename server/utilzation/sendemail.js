import mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();

const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

export const sendRegistrationEmail = async (userEmail, userName, postTitle) => {
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
          TextPart: `Hello ${userName},\n\nThank you for registering for the post "${postTitle}". We appreciate your participation!\n\nBest regards,\nYour Team`,
          HTMLPart: `<h3>Hello ${userName},</h3><p>Thank you for registering for the post "<strong>${postTitle}</strong>". We appreciate your participation!</p><p>Best regards,<br>Your Team</p>`,
        },
      ],
    });

    const response = await request;
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
