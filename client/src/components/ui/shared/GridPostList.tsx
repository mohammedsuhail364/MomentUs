import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

type Creator = {
  _id: string;
  name: string;
  imageUrl: string;
};

type Post = {
  _id: string;
  imageUrl: string;
  creator: Creator;
};

type GridPostListProps = {
  posts: Post[];
  showUser?: boolean;
  showStats: boolean;
};

const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {
  const { data: user } = useGetCurrentUser();
  console.log(posts);
  
  return (
    <ul className="grid-container">
      {posts?.map((post,index) => (
        <li key={index} className="relative min-w-80 h-80">
          <Link to={`/posts/${post._id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && post.creator && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={post.creator.imageUrl}
                  alt="creator"
                  className="h-8 w-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}

            {showStats && <PostStats post={post as any} userId={user?.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
