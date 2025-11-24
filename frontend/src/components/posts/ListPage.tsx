import Error from "../Error";
import List from "./List";
import Loading from "../Loading";
import { useState } from "react";
import Banner from "./Banner";
import { useGetPagePosts } from "../../services/queries/postQuery";
import type { ListPageProps } from "../../types/posts";

const ListPage = ({ categoryId, backgroundImage }: ListPageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: pageData, isLoading } = useGetPagePosts(categoryId, currentPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="relative">
      <Banner backgroundImage={backgroundImage} />

      <div className="max-w-5xl mx-auto pt-5 md:my-15 px-2">
        {isLoading ? (
          <Loading />
        ) : pageData && pageData.postsData ? (
          <List
            data={{
              categoryId: categoryId,
              posts: pageData.postsData,
              currentPage: pageData.currentPage,
              totalPages: pageData.totalPages,
              totalItems: pageData.totalItems,
            }}
            onPageChange={handlePageChange}
          />
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
};

export default ListPage;
