import type { BannerProps } from "../../types/page";

const Banner = ({backgroundImage}: BannerProps) => {
  return (
    <div className="relative h-80">
      <img src={backgroundImage} alt="배경" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black opacity-60 z-[1]"></div>
    </div>
  )
}

export default Banner;