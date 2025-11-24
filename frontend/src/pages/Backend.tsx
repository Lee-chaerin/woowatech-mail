import { BACKGROUND_IMAGE, CATEGORY_ID } from "../utils/constants";
import ListPage from "../components/posts/ListPage";

const Backend = () => {
  return (
    <ListPage
      categoryId={CATEGORY_ID.BACKEND}
      backgroundImage={BACKGROUND_IMAGE.BACKEND}
    />
  );
};


export default Backend;