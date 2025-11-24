import { BACKGROUND_IMAGE, CATEGORY_ID } from "../utils/constants";
import ListPage from "../components/posts/ListPage";

const Android = () => {
  return <ListPage categoryId={CATEGORY_ID.ANDROID} backgroundImage={BACKGROUND_IMAGE.ANDROID} />;
};

export default Android;
