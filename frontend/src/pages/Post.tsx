import { useParams } from "react-router-dom";
import { useGetPostById } from "../services/queries/postQuery";
import Loading from "../components/Loading";
import Banner from "../components/posts/Banner";
import { BACKGROUND_IMAGE } from "../utils/constants";
import PostContent from "../components/posts/PostContent";
import Error from "../components/Error";

const Post = () => {
  const {category, id} = useParams();
  const postId = id ? parseInt(id) : undefined;

  const {data: postData, isLoading} = useGetPostById(postId);

  return (
    <div className="relative">
      <Banner backgroundImage={BACKGROUND_IMAGE.ETC} />
      
      {isLoading ? (
        <Loading />
      ) : postData ? (
        <PostContent postData={postData} category={category!} />
      ) : (
        <Error />
      )}
    </div>
  )
}

export default Post;