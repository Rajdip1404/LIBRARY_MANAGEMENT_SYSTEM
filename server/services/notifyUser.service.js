// import cron from "node-cron";
// import Borrow from "./models/borrow";
// import User from "./models/user";
// import { sendDueDateReminderEmail } from "./utils/email";

// export const notifyUser = async () => {
//   cron.schedule("* * * * */30", async () => {
//     try {
//       // Subtract one day from current time
//       const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

//       // Fetch borrowers with overdue books that haven't been returned and haven't been notified
//       const borrowers = await Borrow.find({
//         dueDate: { $lt: oneDayAgo },
//         returnDate: null,
//         notified: false,
//       }).populate("userId"); // This will automatically populate user details

//       // Process each borrower
//       for (const borrower of borrowers) {
//         const user = borrower.userId; // Now we can access the user directly from the populated field
//         if (user) {
//           try {
//             // Send the reminder email to the user
//             await sendDueDateReminderEmail(
//               user.email,
//               borrower.dueDate,
//               borrower.book.title
//             );
//           } catch (emailError) {
//             console.error(
//               "Error sending due date reminder email:",
//               emailError.message
//             );
//           }
//         }

//         // Mark the borrower as notified
//         borrower.notified = true;
//         await borrower.save(); // Handle errors if needed
//       }
//     } catch (error) {
//       console.error("Error notifying users:", error.message);
//     }
//   });
// };
