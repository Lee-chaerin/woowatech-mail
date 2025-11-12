import { db } from "../db.js";

export const createUser = async (req, res) => {
  const {category_id, email, subscribed, verified} = req.body;
  const sql = "INSERT INTO users (category_id, email, created, verified) VALUES (?, ?, NOW(), ?)";
  const values = [category_id, email, subscribed, verified];
  
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

    return res.status(204);
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "데이터베이스 오류 발생"})
  }
}