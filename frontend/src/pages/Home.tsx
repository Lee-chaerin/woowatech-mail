import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { useCheckUserEmail, useSendVerifyCode, useCheckVerifyCode } from "../services/queries/userQuery";
import { isValidEmail } from "../utils/helpers";

const Home = () => {
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [isCodeInputVisible, setIsCodeInputVisible] = useState(false);

  const checkUserEmailMutation = useCheckUserEmail();
  const sendVerifyCodeMutation = useSendVerifyCode();
  const checkVerifyCodeMutation = useCheckVerifyCode();


  const handleSendVerifyCode = async () => {
    setMessage("");
    setIsError(false);

    if(!category) {
      setMessage("관심있는 직무를 선택해주세요.");
      setIsError(true);
      return;
    }

    if(!email || !isValidEmail(email)) {
      setMessage("유효한 이메일 주소를 입력해주세요.");
      setIsError(true);
      return;
    }

    checkUserEmailMutation.mutate(email, {
      onSuccess: (data) => {
        if(data && data.exists === true) {
          setMessage("이미 가입된 메일 주소입니다.");
          setIsError(true);
          setIsCodeInputVisible(false);
        } else {
          sendVerifyCodeMutation.mutate(email, {
            onSuccess: () => {
              setMessage("인증 메일이 발송되었습니다. 코드를 입력해주세요.");
              setIsError(false);
              setIsCodeInputVisible(true);
            },
            onError: (error) => {
              const serverMessage = error.response?.data?.message;

              console.error("메일 발송 오류: ", error);
              setMessage(serverMessage || "메일 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
              setIsError(true);
              setIsCodeInputVisible(false);
            }
          })
        }
      },
      onError: (error) => {
        const serverMessage = error.response?.data?.message;

        console.error("이메일 확인 중 오류: ", error);
        setMessage(serverMessage || "오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        setIsError(true);
        setIsCodeInputVisible(false);
      }
    })
  }

  const handleCheckVerifyCode = () => {
    setMessage("");
    setIsError(false);

    if(!code) {
      setMessage("인증 코드를 입력해주세요.");
      setIsError(true);
      return;
    }

    checkVerifyCodeMutation.mutate({email, code, category_id: category}, {
      onSuccess: () => {
        setMessage("인증되었습니다.");
        setIsError(false);
      },
      onError: (error) => {
        const serverMessage = error.response?.data?.message;

        console.error("인증 코드 확인 중 오류: ", error);
        setMessage(serverMessage || "오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        setIsError(true);
      }
    })
  }


  return (
    <div className="h-full flex justify-center items-center">
      <video className="absolute inset-0 w-full h-full object-cover z-[-1]"
        src="/background.mp4"
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
      />
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <div className="flex flex-col gap-2 md:gap-4.5 text-4xl md:text-7xl font-bold text-center text-white z-10">
        <h2>매일 아침 성장</h2>
        <h2>실전 면접 대비</h2>
        <h2>깊이 있는 준비</h2>

        <div className="mt-6 flex flex-col gap-2.5 md:gap-3">  
          <Select onValueChange={setCategory}>
            <SelectTrigger className="font-hannaAir font-semibold text-base md:text-xl bg-white/75 text-[#333333] h-10 md:h-11" disabled={isCodeInputVisible}>
              <SelectValue placeholder="직무 선택" />
            </SelectTrigger>
            
            <SelectContent className="font-hannaAir font-semibold">
              <SelectItem value="1" className="text-base">백엔드</SelectItem>
              <SelectItem value="2" className="text-base">프론트엔드</SelectItem>
              <SelectItem value="3" className="text-base">안드로이드</SelectItem>
              <SelectItem value="4" className="text-base">CS 지식</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-row gap-2.5">
            <Input type="email" placeholder="Email 입력" className="font-hannaAir font-semibold bg-white/75 text-[#333333] h-10 md:h-11" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} disabled={isCodeInputVisible} />
            <Button type="button" variant="outline" className="font-hannaAir font-semibold text-base md:text-xl text-black hover:bg-[#ffffffe0] hover:[#333333] h-10 md:h-11" onClick={handleSendVerifyCode}>
              메일 받기
            </Button>
          </div>

          {isCodeInputVisible && (
            <div className="flex flex-row gap-2.5">
              <Input type="email" placeholder="코드 입력" className="font-hannaAir font-semibold bg-white/75 text-[#333333] h-10 md:h-11" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCode(event.target.value)} />
              <Button type="button" variant="outline" className="font-hannaAir font-semibold text-base md:text-xl text-black hover:bg-[#ffffffe0] hover:[#333333] h-10 md:h-11" onClick={handleCheckVerifyCode}>
                메일 인증
              </Button>
            </div>
          )}

          {message && (
            <p className={`font-hannaAir font-semibold text-sm md:text-base ${isError ? 'text-red-400' : 'text-green-400'} text-left`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;