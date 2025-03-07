export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3e5f5;">
  <div style="background: linear-gradient(to right, #8e44ad, #6a1b9a); padding: 25px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Verify Your Email</h1>
  </div>
  <div style="background-color: #ffffff; padding: 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; color: #555;">Hello,</p>
    <p style="font-size: 16px;">Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #8e44ad; background-color: #f3e5f5; padding: 10px 20px; border-radius: 8px; display: inline-block;">
        {verificationCode}
      </span>
    </div>
    <p style="font-size: 16px;">Enter this code on the verification page to complete your registration.</p>
    <p style="font-size: 14px; color: #777;">This code will expire in 15 minutes for security reasons.</p>
    <p style="font-size: 14px; color: #777;">If you didn't create an account with us, please ignore this email.</p>
    <p style="font-size: 16px; color: #555;">Best regards,<br><strong>Your App Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
    <p>This is an automated message. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3e5f5;">
  <div style="background: linear-gradient(to right, #8e44ad, #6a1b9a); padding: 25px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #ffffff; padding: 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; color: #555;">Hello,</p>
    <p style="font-size: 16px;">Your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #8e44ad; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 32px;">
        ✓
      </div>
    </div>
    <p style="font-size: 16px;">If you did not request this password reset, please contact our support team immediately.</p>
    <p style="font-size: 16px;">To keep your account secure, we recommend:</p>
    <ul>
      <li>Using a strong, unique password</li>
      <li>Enabling two-factor authentication</li>
      <li>Avoiding reuse of passwords across multiple sites</li>
    </ul>
    <p style="font-size: 16px;">Thank you for keeping your account secure.</p>
    <p style="font-size: 16px; color: #555;">Best regards,<br><strong>Your App Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
    <p>This is an automated message. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3e5f5;">
  <div style="background: linear-gradient(to right, #8e44ad, #6a1b9a); padding: 25px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Password Reset Request</h1>
  </div>
  <div style="background-color: #ffffff; padding: 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; color: #555;">Hello,</p>
    <p style="font-size: 16px;">We received a request to reset your password on {currentDate}.</p>
    <p style="font-size: 16px;">Click the button below to reset your password:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #8e44ad; color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Reset Password</a>
    </div>
    <p style="font-size: 14px; color: #777;">This link will expire in 15 minutes.</p>
    <p style="font-size: 14px; color: #777;">If you didn’t request a password reset, ignore this email.</p>
    <p style="font-size: 16px; color: #555;">Best regards,<br><strong>Your App Team</strong></p>
  </div>
  <div style="color: #888; font-size: 12px; text-align: center;">
    <p>This is an automated message. Please do not reply.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our App!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3e5f5;">
  <div style="background: linear-gradient(to right, #8e44ad, #6a1b9a); padding: 25px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Welcome to Our App!</h1>
  </div>
  <div style="background-color: #ffffff; padding: 25px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; color: #555;">Hello {name},</p>
    <p style="font-size: 16px;">We’re excited to have you on board!</p>
    <p style="font-size: 16px;">Here’s what you can do next:</p>
    <ul>
      <li>Explore our features</li>
      <li>Set up your profile</li>
      <li>Start using our app to its fullest</li>
    </ul>
    <p style="font-size: 16px;">If you have any questions, feel free to reach out to our support team.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{dashboardURL}" style="background-color: #8e44ad; color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Go to Dashboard</a>
    </div>
    <p style="font-size: 16px; color: #555;">Best regards,<br><strong>Your App Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
    <p>This is an automated message. Please do not reply.</p>
  </div>
</body>
</html>
`;


// style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;
