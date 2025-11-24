import { BACKGROUND_IMAGE, CATEGORY_ID } from "../utils/constants";
import ListPage from "../components/posts/ListPage";

const Cs = () => {
  return (
    <ListPage
      categoryId={CATEGORY_ID.CS}
      backgroundImage={BACKGROUND_IMAGE.CS}
    />
  );
};


export default Cs;