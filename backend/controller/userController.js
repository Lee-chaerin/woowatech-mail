import { db } from "../db.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../services/mailer.js";


const pendingCodes = new Map();

export const sendVerifyMail = async(req, res) => {
  const {email} = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5*60*1000;

  pendingCodes.set(email, {code, expires});
  await sendVerificationEmail(email, code);

  res.json({message: "인증 메일 발송 완료"});
}

export const verifyCode = async(req, res) => {
  const {email, code, category_id} = req.body;
  const record = pendingCodes.get(email);

  if(!record) return res.status(400).json({message: "인증 요청이 없습니다."});
  if(record.expires < Date.now()) {
    pendingCodes.delete(email);
    return res.status(400).json({message: "인증 코드가 만료되었습니다. 다시 요청하세요"});
  }
  if(record.code !== code.toString()) return res.status(400).json({message: "인증 코드가 올바르지 않습니다."})

  const sql = "INSERT INTO users (category_id, email, created) VALUES (?, ?, NOW())";
  const values = [category_id, email];

  await db.execute(sql, values);
  pendingCodes.delete(email);

  res.json({message: "메일 인증 완료"});
}

export const createUser = async (req, res) => {
  const {category_id, email} = req.body;
  const sql = "INSERT INTO users (category_id, email, created) VALUES (?, ?, NOW())";
  const values = [category_id, email];
  
  try {
    const [result] = await db.execute(sql, values);
    return res.status(201).json(result);
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "데이터베이스 오류 발생"})
  }
};

export const getAllUsers = async (req, res) => {
  const sql = "SELECT * FROM users";

  try {
    const [result] = await db.execute(sql);
    return res.status(200).json(result);
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "데이터베이스 오류 발생"})
  }
}

export const getUserById = async (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  const {id} = req.params;

  try {
    const [result] = await db.execute(sql, [id]);

    if(result.length === 0) {
      return res.status(404).json({message: "해당 ID의 유저는 없습니다."})
    }

    return res.status(200).json(result[0]);
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "데이터베이스 오류 발생"})
  }
}

export const deleteUser = async (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const {id} = req.params;

  try {
    const [result] = await db.execute(sql, [id]);

    if(result.affectedRows === 0) {
      return res.status(404).json({message: "해당 ID의 유저는 없습니다."})
    }

    return res.status(204).end();
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "데이터베이스 오류 발생"})
  }
}