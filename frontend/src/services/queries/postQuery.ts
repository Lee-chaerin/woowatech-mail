import { useQuery } from "@tanstack/react-query"
import { getPagePosts } from "../apis/post"

export const useGetPagePosts = (categoryId: number, page: number) => {
  return useQuery({
    queryKey: ["pagePosts", categoryId, page],
    queryFn: () => getPagePosts(categoryId, page),
    enabled: !!categoryId
  })
}