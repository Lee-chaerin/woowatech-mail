import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
});

export const sendVerificationEmail = async (email, code) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: '이메일 인증 코드',
    html: `<p>인증 코드: <b>${code}</p>`
  });
};