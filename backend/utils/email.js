// import nodemailer from 'nodemailer';

// // Create a transporter with SMTP settings
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'np03cs4s220027@heraldcollege.edu.np',
//     pass: 'qpsngvcfibuvkyyg', // gmail password
//   },
// });

// // Function to send password reset email
// export const sendPasswordResetEmail = async (email, password) => {
//   try {
//     // Send mail with defined transport object
//     await transporter.sendMail({
//       from: 'np03cs4s220027@heraldcollege.edu.np',
//       to: email,
//       subject: 'Password Reset',
//       text: `Your new password is: ${password}. Please reset your password after logging in.`,
//     });
//     console.log('Password reset email sent successfully');
//   } catch (error) {
//     console.error('Error sending password reset email:', error);
//     throw new Error('Error sending password reset email');
//   }
// };
