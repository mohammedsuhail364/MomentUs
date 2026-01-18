import {
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type Post = {
  _id: string;
  likes: string[];
};

type PostStatsProps = {
  post: Post;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  console.log(post,"post");
  
  // likes are already userId strings
  const [likes, setLikes] = useState<string[]>(post?.likes || []);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { data: currentUser } = useGetCurrentUser();

  // check saved posts (MongoDB style)
  useEffect(() => {
    if (!currentUser) return;

    const saved = currentUser.savedPosts?.some(
      (p: { _id: string }) => p._id === post._id
    );

    setIsSaved(!!saved);
  }, [currentUser, post._id]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    const hasLiked = likes.includes(userId);
    const updatedLikes = hasLiked
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];

    // optimistic update
    setLikes(updatedLikes);

    likePost({ postId: post._id,likesArray:post.likes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved((prev) => !prev);
    savePost({ postId: post._id,userId:currentUser._id });
  };

  return (
    <div className="flex justify-between items-center z-20">
      {/* LIKE */}
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      {/* SAVE */}
      <div className="flex gap-2">
        {isSaving ? (
          <Loader />
        ) : (
          <img
            src={
              isSaved
                ? "/assets/icons/saved.svg"
                : "/assets/icons/save.svg"
            }
            alt="save"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
