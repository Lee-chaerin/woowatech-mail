import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import type { PostContentProps } from "../../types/posts";

const PostContent = ({ category, postData }: PostContentProps) => {
  const navigate = useNavigate();
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const handleGoBack = () => {
    navigate(`/${category}`);
  };

  const handleShowAnswer = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  return (
    <div className="max-w-5xl mx-auto pt-5 md:my-15 px-5">
      <div className="mb-5">
        <Button variant="outline" onClick={handleGoBack}>
          <ArrowLeft />
        </Button>
      </div>

      <p className="text-xl md:text-2xl font-hannaAir font-semibold min-h-20 pb-13">
        Q. {postData.question}
      </p>

      <div className="flex justify-center">
        <Button
          className="bg-[#6eebd4] text-black font-hanna text-xl py-5.5 px-6 hover:text-white"
          onClick={() => handleShowAnswer()}
        >
          {isAnswerVisible ? "정답 닫기" : "정답 확인"}
        </Button>
      </div>

      {isAnswerVisible && <p className="text-base md:text-lg mt-5">{postData.answer}</p>}
    </div>
  );
};

export default PostContent;
