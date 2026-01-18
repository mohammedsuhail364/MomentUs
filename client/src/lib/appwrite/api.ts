import API from "./axios";
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";

/* ========================== AUTH ========================== */

export async function createUserAccount(user: INewUser) {
  const res = await API.post("/auth/register", user);
  localStorage.setItem("token", res.data.token);
  return res.data.user;
}

export async function signInAccount(user: { email: string; password: string }) {
  const res = await API.post("/auth/login", user);
  localStorage.setItem("token", res.data.token);
  return res.data.user;
}

export async function signOutAccount() {
  localStorage.removeItem("token");
  
}

export async function getCurrentUser() {
  const res = await API.get("/users/me");
  return res.data;
}

/* ========================== POSTS ========================== */

export async function createPost(post: INewPost) {
  const formData = new FormData();
  formData.append("file", post.file[0]);
  formData.append("caption", post.caption);
  formData.append("location", post.location || "");
  formData.append("tags", post.tags || "");

  const res = await API.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export async function getRecentPosts() {
  const res = await API.get("/posts");
  return res.data;
}

export async function getPostById(postId: string) {
  const res = await API.get(`/posts/${postId}`);
  return res.data;
}

export async function updatePost(post: IUpdatePost) {
  const formData = new FormData();
  if (post.file?.length) {
    formData.append("file", post.file[0]);
  }
  formData.append("caption", post.caption);
  formData.append("location", post.location || "");
  formData.append("tags", post.tags || "");

  const res = await API.patch(`/posts/${post.postId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export async function deletePost(postId: string,imageId:string) {
  await API.delete(`/posts/${postId}`);
  return { status: "ok" };
}

/* ========================== LIKES & SAVES ========================== */

export async function likePost(postId: string,likesArray:any) {
  const res = await API.patch(`/posts/${postId}/like`);
  return res.data;
}

export async function savePost(postId: string,userId:string) {
  const res = await API.post(`/posts/${postId}/save`);
  return res.data;
}

export async function deleteSavedPost(savedId: string) {
  await API.delete(`/posts/save/${savedId}`);
  return { status: "ok" };
}

/* ========================== SEARCH & PAGINATION ========================== */

export async function searchPost(searchTerm: string) {
  const res = await API.get(`/posts/search?q=${searchTerm}`);
  return res.data;
}

export async function getInfinitePosts({ pageParam }: { pageParam?: string }) {
  const res = await API.get("/posts", {
    params: { cursor: pageParam },
  });
  return res.data;
}

/* ========================== USERS ========================== */

export async function getUsers(limit?: number) {
  const res = await API.get("/users", {
    params: { limit },
  });
  return res.data;
}

export async function getUserById(userId: string) {
  const res = await API.get(`/users/${userId}`);
  return res.data;
}

export async function updateUser(user: IUpdateUser) {
  const res = await API.patch("/users/me", {
    name: user.name,
    bio: user.bio,
    imageUrl: user.imageUrl, // or handle upload separately
  });
  return res.data;
}
