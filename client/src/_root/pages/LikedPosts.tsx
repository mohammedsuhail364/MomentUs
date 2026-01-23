import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import {  useGetLikedPosts } from "@/lib/react-query/queriesAndMutations";

const LikedPosts = () => {
  
  const {data:likedPosts,isLoading}=useGetLikedPosts();
  const currentUserLikedPosts=likedPosts?.posts;
  

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {currentUserLikedPosts=== 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUserLikedPosts} showStats={false} />
    </>
  );
};

export default LikedPosts;