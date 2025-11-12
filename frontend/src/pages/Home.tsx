import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Home = () => {
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
      <div className="flex flex-col gap-2 md:gap-4 text-4xl md:text-7xl font-bold text-center text-white z-10">
        <h2>매일 아침 성장</h2>
        <h2>실전 면접 대비</h2>
        <h2>깊이 있는 준비</h2>

        <form className="mt-6 flex flex-col gap-2.5 md:gap-3">  
          <Select>
            <SelectTrigger className="font-hannaAir font-semibold text-base md:text-lg bg-white/75 text-[#333333] h-10">
              <SelectValue placeholder="직무 선택" />
            </SelectTrigger>
            
            <SelectContent className="font-hannaAir font-semibold text-base md:text-lg">
              <SelectItem value="1" className="text-base">백엔드</SelectItem>
              <SelectItem value="2" className="text-base">프론트엔드</SelectItem>
              <SelectItem value="3" className="text-base">안드로이드</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-row gap-2.5">
            <Input type="email" placeholder="Email 입력" className="font-hannaAir font-semibold bg-white/75 text-[#333333]" />
            <Button type="submit" variant="outline" className="font-hannaAir font-semibold text-base md:text-lg text-black hover:bg-[#ffffffe0] hover:[#333333] h-10">
              메일 받기
            </Button>
          </div>
          
        </form>
      </div>

      
    </div>
  )
}

export default Home;