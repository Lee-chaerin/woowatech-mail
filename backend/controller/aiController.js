import OpenAI from "openai";
import { db } from "../db.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateInterviewQA = async (categoryId) => {
  const categoryMap = {
    1: "backend",
    2: "frontend",
    3: "android",
    4: "computer science"
  }

  const categoryName = categoryMap[categoryId];
  if(!categoryName) {
    console.error(`유효하지 않은 categoryId: ${categoryId}`);
    return;
  }

  try {
    const [rows] = await db.query(
      "SELECT question FROM questions WHERE category_id=?", [categoryId]
    );
    const existingQuestions = rows.map((row) => row.question);

    let newQuestion = null;
    let newAnswer = null;
    let attempts = 0;
    
    while(!newQuestion && attempts < 3) {
      attempts++;

      const prompt = `
        너는 ${categoryName} 개발자 면접 출제자야.
        
        아래는 이미 출제된 질문이야. 
        이 질문들과 절대 겹치지 않게 새로운 면접 질문 1개와 그에 대한 모범 답변을 만들어.
        
        출력은 반드시 JSON 배열 형식으로 작성해.
        예시:
        [
          {"question": "질문", "answer": "답변"}
        ]

        이미 출제된 질문 (최대 50개만 참고):
        ${JSON.stringify(existingQuestions.slice(-50))} 
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      let content = completion.choices[0].message.content.trim();
      content = content.replace(/```json|```/g, "").trim();
      
      let result;
      try {
        result = JSON.parse(content);
      } catch (error) {
        console.error("AI 결과 파싱 실패", content);
        return;
      }

      const item = result[0];
      if(!existingQuestions.includes(item.question)) {
        newQuestion = item.question;
        newAnswer = item.answer;
      } else {
        console.log(`${categoryName} 질문 중복, ${attempts}번째 재시도`);
      }
    }
    
    if(newQuestion) {
      await db.query(
        "INSERT INTO questions (category_id, question, answer, created) VALUES (?, ?, ?, NOW())",
        [categoryId, newQuestion, newAnswer]
      );
      console.log(`${categoryName} 질문 생성 완료`);
    } else {
      console.log(`${categoryName} 질문 생성 실패: 중복 3회 발생`);
    }
  } catch(error) {
    console.error(`${categoryName} 질문 생성 실패: `, error.message);
  }
};

export const generateInterviewQAHandler = async(req, res) => {
  try {
    const { category_id } = req.body;
    if (!category_id) {
      return res.status(400).json({ error: "category_id가 필요합니다." });
    }

    const result = await generateInterviewQA(category_id);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "면접 질문 생성 실패", details: err.message });
  }
}