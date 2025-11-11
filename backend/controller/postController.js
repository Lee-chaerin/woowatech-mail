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

export const getAllPosts = async (req, res) => {
  const sql = "SELECT * FROM questions";

  try {
    const [result] = await db.execute(sql);
    return res.status(200).json(result);
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "데이터베이스 오류 발생"})
  }
}

export const getPostById = async (req, res) => {
  const sql = "SELECT * FROM questions WHERE id = ?";
  const {id} = req.params;

  try {
    const [result] = await db.execute(sql, [id]);

    if(result.length === 0) {
      return res.status(404).json({message: "해당 ID의 게시글은 없습니다."})
    }

    return res.status(200).json(result[0]);
  } catch(error) {
    console.log(error);
    return res.status(500).json({error: "데이터베이스 오류 발생"})
  }
}