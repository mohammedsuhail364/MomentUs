import Loader from "./Loader";
import GridPostList from "./GridPostList";



const SearchedResults = ({
  isSearchFetching,
  searchedPosts,
}: any) => {
  if (isSearchFetching) return <Loader />;

  if (searchedPosts && searchedPosts?.length > 0 ) {
    return <GridPostList posts={searchedPosts} showStats={true} />;
  }
  return (
    <p className=" text-light-4 mt-10 text-center w-full">No Results Found</p>
  );
};

export default SearchedResults;
