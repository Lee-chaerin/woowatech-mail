import { useQuery } from "@tanstack/react-query";
import { getPagePosts, getPostById } from "../apis/post";

export const useGetPagePosts = (categoryId: number, page: number) => {
  return useQuery({
    queryKey: ["pagePosts", categoryId, page],
    queryFn: () => getPagePosts(categoryId, page),
    enabled: !!categoryId,
  });
};

export const useGetPostById = (id: number | undefined) => {
  const enabled = id !== undefined;

  return useQuery({
    queryKey: ["postById", id],
    queryFn: () => getPostById(id!),
    enabled: enabled,
  });
};
