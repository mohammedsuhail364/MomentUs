import Loader from "@/components/ui/shared/Loader";
import PostCard from "@/components/ui/shared/PostCard";
import {
  useGetCurrentUser,
  UseGetRecentPosts,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data: posts, isPending: isPostLoading } = UseGetRecentPosts();

  const {
    data: currentUser,
    isPending: isUserLoading,
    isError: isUserError,
  } = useGetCurrentUser();

  const navigate = useNavigate();

  useEffect(() => {
    // wait for the user query to resolve
    if (isUserLoading) return;

    // if request failed or no user, kick them out
    if (isUserError || !currentUser) {
      navigate("/sign-in", { replace: true });
    }
  }, [currentUser, isUserLoading, isUserError, navigate]);

  // Optional: block rendering until auth is known
  if (isUserLoading) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>

          {isPostLoading ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
