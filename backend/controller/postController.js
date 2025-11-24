import { db } from "../db.js";

export const createPost = async (req, res) => {
  const sql =
    "INSERT INTO questions (category_id, question, answer, created) VALUES (?, ?, ?, NOW())";
  const { category_id, question, answer } = req.body;

  try {
    const [result] = await db.execute(sql, [category_id, question, answer]);
    return res.status(201).json(result);
  } catch (error) {
    console.log("게시글 생성 오류: ", error);
    return res.status(500).json({ message: "게시글 생성 중 오류가 발생했습니다." });
  }
};

export const getAllPosts = async (req, res) => {
  const sql = "SELECT * FROM questions";

  try {
    const [result] = await db.execute(sql);
    return res.status(200).json(result);
  } catch (error) {
    console.log("전체 게시글 조회 오류: ", error);
    return res.status(500).json({ message: "데이터를 조회하는 중 오류가 발생했습니다." });
  }
};

export const getPagePosts = async (req, res) => {
  const categoryId = req.params.categoryId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const countSql = "SELECT COUNT(*) AS total FROM questions WHERE category_id = ?";
    const [countResult] = await db.execute(countSql, [categoryId]);

    const dataSql =
      "SELECT * FROM questions WHERE category_id = ? ORDER BY id DESC LIMIT ? OFFSET ?";
    const [dataResult] = await db.execute(dataSql, [categoryId, limit, offset]);

    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      postsData: dataResult,
      currentPage: page,
      limit: limit,
      totalItems: totalItems,
      totalPages: totalPages,
    });
  } catch (error) {
    console.log("페이지네이션 조회 오류: ", error);
    return res.status(500).json({ message: "데이터를 조회하는 중 오류가 발생했습니다." });
  }
};

export const getPostById = async (req, res) => {
  const sql = "SELECT * FROM questions WHERE id = ?";
  const { id } = req.params;

  try {
    const [result] = await db.execute(sql, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "해당 ID의 게시글은 없습니다." });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log("게시글 조회 오류: ", error);
    return res.status(500).json({ message: "데이터를 조회하는 중 오류가 발생했습니다." });
  }
};

export const getLatestPostByCategory = async (category_id) => {
  const sql = "SELECT * FROM questions WHERE category_id = ? ORDER BY created DESC LIMIT 1";

  try {
    const [result] = await db.execute(sql, [category_id]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.log(`가장 최근 게시글 조회 오류(${category_id}): `, error);
    return res.status(500).json({ message: "데이터를 조회하는 중 오류가 발생했습니다." });
  }
};
