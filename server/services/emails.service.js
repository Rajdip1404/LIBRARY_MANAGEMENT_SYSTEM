import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/email.config.js";


export const sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }];
  const subject = "Verify Your Email";
  const html = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationCode
  );
  const category = "Email verification";

  try {
    await sendEmail(recipient[0].email, category, subject, html);
  } catch (error) {
    console.log("Error sending verification email:", error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  const subject = `Welcome ${name} to the family!`;
  const html = WELCOME_EMAIL_TEMPLATE.replace("{name}", name);
  const category = "Welcome";

  try {
    await sendEmail(recipient[0].email, category, subject, html);
  } catch (error) {
    console.log("Error sending Welcome email:", error.message);
  }
};

export const sendResetPasswordEmail = async (email, resetLink) => {
  const recipient = [{ email }];
  const subject = "Reset Your Password";
  const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    "{resetURL}",
    resetLink
  ).replace("{currentDate}", new Date().toLocaleDateString());
  const category = "Password Reset";

  try {
    await sendEmail(recipient[0].email, category, subject, html);
  } catch (error) {
    console.log("Error sending reset password email:", error.message);
  }
};

export const sendSuccessResetPasswordEmail = async (email) => {
  const recipient = [{ email }];
  const subject = "Successfully Reset Password";
  const html = PASSWORD_RESET_SUCCESS_TEMPLATE;
  const category = "Password Reset Successful";

  try {
    await sendEmail(recipient[0].email, category, subject, html);
  } catch (error) {
    console.log("Error sending reset password email:", error.message);
  }
};

export const sendDueDateReminderEmail = async (email, dueDate, bookTitle) => {
  const recipient = [{ email }];
  const subject = "Reminder: Book Due Date Tomorrow";

  // Format the due date to a more user-friendly format (e.g., March 10, 2025)
  const formattedDueDate = new Date(dueDate).toLocaleDateString();

  // Create the HTML content for the reminder email
  const html = DUE_DATE_REMINDER_EMAIL_TEMPLATE.replace(
    "{bookTitle}",
    bookTitle
  ).replace("{dueDate}", formattedDueDate);

  const category = "Book Due Date Reminder";

  try {
    // Send the reminder email
    await sendEmail(recipient[0].email, category, subject, html);
  } catch (error) {
    console.log("Error sending due date reminder email:", error.message);
  }
};

