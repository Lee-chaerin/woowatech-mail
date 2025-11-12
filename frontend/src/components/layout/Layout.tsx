import type { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className="relative h-screen">
      <Header />
      <main className="absolute inset-0 z-0">
        {children}
      </main>
    </div>
  )
}

export default Layout;
