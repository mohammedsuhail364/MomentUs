import GridPostList from "@/components/ui/shared/GridPostList";
import {
  useGetCurrentUser,
  useGetSavedPosts,
} from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { data: savedPostsResponse } = useGetSavedPosts();

  // Keep your existing logic: savedPosts comes from data?.posts
  const savePosts = savedPostsResponse?.posts;

  // Keep your existing logic: show loader only when both are missing
  const shouldShowLoader = !currentUser && !savePosts;

  // Keep your debug log, but avoid noisy logs in production builds
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(savedPostsResponse);
  }

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
          loading="lazy"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {shouldShowLoader ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts?.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts ?? []} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
