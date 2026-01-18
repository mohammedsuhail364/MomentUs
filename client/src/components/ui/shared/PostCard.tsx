import { useUserContext } from "@/context/AuthContext";
import { formatDateString } from "@/lib/utils";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type Creator = {
  _id: string;
  name: string;
  imageUrl?: string;
};

type Post = {
  _id: string;
  caption: string;
  imageUrl: string;
  location?: string;
  tags: string[];
  createdAt: string;
  creator: Creator;
};

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return null;

  const isOwner = user?.id === post.creator._id;

  return (
    <div className="post-card">
      {/* HEADER */}
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator._id}`}>
            <img
              src={
                post.creator.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-12 h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>

            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatDateString(post.createdAt)}
              </p>
              {post.location && (
                <>
                  <span>-</span>
                  <p className="subtle-semibold lg:small-regular">
                    {post.location}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* EDIT ICON */}
        {isOwner && (
          <Link to={`/update-post/${post._id}`}>
            <img
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
        )}
      </div>

      {/* BODY */}
      <Link to={post.imageUrl}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>

          {post.tags?.length > 0 && (
            <ul className="flex gap-1 mt-2">
              {post.tags.map((tag) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <img
          src={post.imageUrl}
          className="post-card_img"
          alt="post"
        />
      </Link>

      {/* STATS */}
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
