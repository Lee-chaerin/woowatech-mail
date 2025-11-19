import Error from "../components/Error";
import List from "../components/List";
import Loading from "../components/Loaing";
import { useGetPagePosts } from "../services/queries/postQuery";
import { useState } from "react";
import { CATEGORY_ID } from "../utils/constants";

const AndroidList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: pageData, isLoading } = useGetPagePosts(CATEGORY_ID.ANDROID, currentPage);
  
  if (isLoading) {
    return <Loading />
  }

  if(!pageData || !pageData.postsData) {
    return <Error />
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  return (
    <div className="relative">
      <div className="relative h-80">
        <img src="/background_android.jpg" alt="안드로이드 배경" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black opacity-60 z-[1]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto pt-5 md:my-15 px-2">
        <List data={{
          posts: pageData.postsData,
          currentPage: pageData.currentPage,
          totalPages: pageData.totalPages,
          totalItems: pageData.totalItems
        }} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};


export default AndroidList;