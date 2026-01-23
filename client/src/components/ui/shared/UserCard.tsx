import { Link } from "react-router-dom";
import { Button } from "../button";

type User = {
  _id: string;
  name?: string;
  username?: string;
  email?: string;
  imageUrl?: string;
};

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  const userId = user?._id;

  return (
    <Link to={`/profile/${userId}`} className="user-card">
      <img
        src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt={user?.name ? `${user.name} profile` : "profile"}
        className="rounded-full w-14 h-14"
        loading="lazy"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user?.name || "Unknown"}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user?.username || "user"}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
