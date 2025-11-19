import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"


const Header = () => {
  const navigate = (url: string) => {
    window.location.href = url;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-20 md:h-24 px-6 md:px-12 py-5 md:py-8 flex justify-between items-center hover:bg-[#ffffffe0] text-white hover:text-[#333333] z-50">
      <a href='/' className="text-3xl md:text-4xl font-hannaPro">우아한테크메일</a>
      <nav className="hidden md:flex justify-between items-center w-sm lg:w-md text-2xl font-hanna">
        <a href='/backend'>백엔드</a>
        <a href='/frontend'>프론트엔드</a>
        <a href='/android'>안드로이드</a>
        <a href='/cs'>CS지식</a>
      </nav>

      <div className='md:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <Menu/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-lg font-hanna" onSelect={() => navigate('/backend')}>백엔드</DropdownMenuItem>
            <DropdownMenuItem className="text-lg font-hanna" onSelect={() => navigate('/frontend')}>프론트엔드</DropdownMenuItem>
            <DropdownMenuItem className="text-lg font-hanna" onSelect={() => navigate('/android')}>안드로이드</DropdownMenuItem>
            <DropdownMenuItem className="text-lg font-hanna" onSelect={() => navigate('/cs')}>CS지식</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Header;