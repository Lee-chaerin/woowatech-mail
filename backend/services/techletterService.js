import { getAllUserEmailsAndCategories } from "../controller/userController.js"; 
import { sendTechletterEmail } from "./mailer.js";
import { getLatestPostByCategory } from "../controller/postController.js";
import { CATEGORY_ID } from "./constants.js";

export const sendNewsletter = async () => {
    console.log("뉴스레터 발송 작업 시작...");
    
    const users = await getAllUserEmailsAndCategories();

    if (users.length === 0) {
        console.log("발송할 유저가 없습니다.");
        return;
    }
    
    let successfulSends = 0;

    const formatCategory = (category_id) => {
        return CATEGORY_ID[category_id]
    }

    for (const user of users) {
        const { email, category_id } = user;
        
        const latestPost = await getLatestPostByCategory(category_id);
        
        if (!latestPost) {
            console.log(`[PASS] ${email}: 카테고리 ${category_id}의 최신 게시글이 없습니다.`);
            continue;
        }

        const content = `
            <h3>${latestPost.question}</h3>
            <p style="margin-top: 20px;">
                <a href="http://localhost:5173/${formatCategory(category_id)}/${latestPost.id}" style="padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                    답변 확인하기
                </a>
            </p>
        `;
        
        try {
            await sendTechletterEmail(email, content); 
            successfulSends++;
        } catch (error) {
            console.error(`면접레터 발송 실패: ${email}`, error);
        }
    }

    console.log(`총 ${users.length}명 중 ${successfulSends}명에게 면접레터 발송 완료.`);
};