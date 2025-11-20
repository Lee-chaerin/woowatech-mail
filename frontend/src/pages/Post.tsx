import { useParams } from "react-router-dom";
import { useGetPostById } from "../services/queries/postQuery";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import Loading from "../components/Loaing";

const Post = () => {
  const {id} = useParams();

  const[answerView, setAnswerView] = useState(false);

  const postId = id ? parseInt(id) : undefined;

  const {data: postData, isLoading} = useGetPostById(postId);

  console.log(postData)

  const handleShowAnswer = () => {
    setAnswerView(prev => !prev);
  }

  if(isLoading) {
    return <Loading />
  }
  
  
  return (
    <div className="relative">
      <div className="relative h-50 bg-[#6eebd4]">
        
      </div>
      
      <div className="max-w-5xl mx-auto pt-5 md:my-15 px-2">
        <p className="text-2xl font-hannaAir font-semibold">Q. {postData.question}</p>

        <div className="flex justify-center mt-10">
          <Button className="bg-[#6eebd4] text-black font-hanna text-lg hover:text-white" onClick={() => handleShowAnswer()}>정답 확인</Button>
        </div>

        {answerView && (
          <p className="text-lg mt-5">{postData.answer}</p>
        )}
        
      </div>
    </div>
  )
}

export default Post;