export type PostItem = {
  id: number;
  question: string;
  created: string;
};

export type ListData = {
  categoryId: number;
  posts: PostItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export type ListProps = {
  data: ListData;
  onPageChange: (page: number) => void;
};

export interface BannerProps {
  backgroundImage: string;
}

export interface ListPageProps {
  categoryId: number;
  backgroundImage: string;
}

export interface PostContentProps {
  category: string;
  postData: {
    question: string;
    answer: string;
  };
}
