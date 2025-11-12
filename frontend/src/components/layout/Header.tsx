import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"


const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-20 md:h-24 px-6 md:px-12 py-5 md:py-8 flex justify-between items-center hover:bg-[#ffffffe0] text-white hover:text-[#333333] z-50">
      <h1 className="text-3xl md:text-4xl font-hannaPro">우아한테크메일</h1>
      
      <nav className="hidden md:flex justify-between items-center w-xs text-2xl font-hanna">
        <a href='#'>백엔드</a>
        <a href='#'>프론트엔드</a>
        <a href='#'>안드로이드</a>
      </nav>

      <div className='md:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <Menu/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-lg font-hanna"><a href="#">백엔드</a></DropdownMenuItem>
            <DropdownMenuItem className="text-lg font-hanna"><a href="#">프론트엔드</a></DropdownMenuItem>
            <DropdownMenuItem className="text-lg font-hanna"><a href="#">안드로이드</a></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </div>
    </div>
  )
}

export default Header;