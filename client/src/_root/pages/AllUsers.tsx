import Loader from "@/components/ui/shared/Loader";
import UserCard from "@/components/ui/shared/UserCard";
import { useToast } from "@/hooks/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

type Creator = {
  _id: string;
  name?: string;
  username?: string;
  email?: string;
  imageUrl?: string;
};

const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();
  console.log(creators);
  
  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    
    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.map((creator:Creator) => (
              <li key={creator?._id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;