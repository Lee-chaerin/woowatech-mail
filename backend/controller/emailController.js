import { db } from "../db.js";

export const createUser = async (req, res) => {
  const {category_id, email, subscribed, verified} = req.body;
  const sql = "INSERT INTO users (category_id, email, subscribed, created, verified) VALUES (?, ?, ?, NOW(), ?)";
  const values = [category_id, email, subscribed, verified];
  
  try {
    const [result] = await db.execute(sql, values);
    return res.status(201).json(result);
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "데이터베이스 오류 발생"})
  }
};
