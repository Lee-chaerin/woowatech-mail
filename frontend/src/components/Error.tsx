import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center flex-col gap-3 justify-center z-50">
      <h1>문제가 발생했습니다. 다시 시도해주세요.</h1>
      <Button onClick={() => navigate("/")}>홈으로</Button>
    </div>
  )
}

export default Error;