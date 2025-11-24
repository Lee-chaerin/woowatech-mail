import { requestAPI } from "../../utils/fetch";

export const getPagePosts = async (category_id: number, page: number) => {
  const data = await requestAPI().get(`/posts/category/${category_id}?page=${page}`, {
    category_id,
    page,
  });
  return data;
};

export const getPostById = async (id: number) => {
  const data = await requestAPI().get(`/posts/${id}`, id);
  return data;
};
