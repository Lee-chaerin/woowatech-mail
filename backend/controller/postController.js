import { db } from "../db.js";

export const createPost = async (req, res) => {
  const {category_id, question, answer} = req.body;
  const sql = "INSERT INTO questions (category_id, question, answer, created) VALUES (?, ?, ?, NOW())";
  const values = [category_id, question, answer];
  
  try {
    const [result] = await db.execute(sql, values);
    return res.status(201).json(result);
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "데이터베이스 오류 발생"})
  }
};