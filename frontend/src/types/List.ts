export type ListItem = {
  id: number | string;
  question: string;
  created: string;
}

export type ListProps = {
  data: ListItem[];
}