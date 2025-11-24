import { db } from "../db.js";
import { sendVerificationCodeEmail } from "../services/mailer.js";

const pendingCodes = new Map();

export const sendVerifyCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "이메일 주소가 누락되었습니다." });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  pendingCodes.set(email, { code, expiresAt });

  try {
    await sendVerificationCodeEmail(email, code);
    res.json({ message: "인증 메일 발송 완료" });
  } catch (error) {
    console.error("메일 발송 오류: ", error);
    pendingCodes.delete(email);
    return res.status(500).json({ message: "메일 발송 중 오류가 발생했습니다." });
  }
};

export const checkVerifyCode = async (req, res) => {
  const { email, code, category_id } = req.body;
  const record = pendingCodes.get(email);

  if (!email || !code || category_id === undefined) {
    return res.status(400).json({ message: "필수 정보(이메일, 코드, 직무)가 누락되었습니다." });
  }

  if (!record) return res.status(400).json({ message: "인증 요청이 없습니다." });

  if (record.expires < Date.now()) {
    pendingCodes.delete(email);
    return res.status(400).json({ message: "인증 코드가 만료되었습니다. 다시 요청하세요" });
  }

  if (record.code !== code)
    return res.status(400).json({ message: "인증 코드가 올바르지 않습니다." });

  const sql = "INSERT INTO users (category_id, email, created) VALUES (?, ?, NOW())";
  const values = [Number(category_id), email];

  try {
    await db.execute(sql, values);
    pendingCodes.delete(email);

    res.json({ message: "메일 인증이 완료되었습니다." });
  } catch (error) {
    console.error("사용자 등록 오류: ", error);
    return res.status(500).json({ message: "사용자 등록 중 오류가 발생했습니다." });
  }
};

export const getAllUsers = async (req, res) => {
  const sql = "SELECT * FROM users";

  try {
    const [result] = await db.execute(sql);
    return res.status(200).json(result);
  } catch (error) {
    console.error("사용자 전체 조회 오류: ", error);
    return res.status(500).json({ message: "사용자 조회 중 오류가 발생했습니다." });
  }
};

export const getUserByEmail = async (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const { email } = req.body;

  try {
    const [result] = await db.execute(sql, [email]);

    if (result.length === 0) {
      return res.status(200).json({ exists: false, message: "해당 이메일의 유저는 없습니다." });
    }

    return res.status(200).json({ exists: true, user: result[0] });
  } catch (error) {
    console.error("사용자 이메일 조회 오류: ", error);
    return res.status(500).json({ error: "사용자 조회 중 오류가 발생했습니다." });
  }
};

export const getUserById = async (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  const { id } = req.params;

  try {
    const [result] = await db.execute(sql, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "해당 ID의 유저는 없습니다." });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error("사용자 아이디 조회 오류: ", error);
    return res.status(500).json({ error: "사용자 조회 중 오류가 발생했습니다." });
  }
};

export const deleteUser = async (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const { id } = req.params;

  try {
    const [result] = await db.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "해당 ID의 유저는 없습니다." });
    }

    return res.status(204).end();
  } catch (error) {
    console.error("사용자 삭제 오류: ", error);
    return res.status(500).json({ error: "사용자 삭제 중 오류가 발생했습니다." });
  }
};

export const getAllUserEmailsAndCategories = async () => {
  const sql = "SELECT email, category_id FROM users";

  try {
    const [result] = await db.execute(sql);
    return result;
  } catch (error) {
    console.error("사용자 목록 조회 오류: ", error);
    return res.status(500).json({ message: "사용자 조회 중 오류가 발생했습니다." });
  }
};
