import { BACKGROUND_IMAGE, CATEGORY_ID } from "../utils/constants";
import ListPage from "../components/posts/ListPage";

const Frontend = () => {
  return (
    <ListPage
      categoryId={CATEGORY_ID.FRONTEND}
      backgroundImage={BACKGROUND_IMAGE.FRONTEND}
    />
  );
};


export default Frontend;