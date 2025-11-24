import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
});

export const sendVerificationCodeEmail = async (email, code) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: '우테메 이메일 인증 코드',
    html: `<p>인증 코드: <b>${code}</p>`
  });
};


export const sendTechletterEmail = async (email, content) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "[우테메] 💡 오늘의 추천 질문",
    html: `<div style="font-family: sans-serif; padding: 20px;">
             <h2>[우테메] 💡 오늘의 추천 질문</h2>
             <p>${content}</p>
             <p style="margin-top: 50px">더 많은 정보를 확인하려면 <a href="http://localhost:5173">여기를 클릭</a>하세요.</p>
           </div>`
  });
};