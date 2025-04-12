export type PostType = {
  title: string;
  postText: string;
  username: string;
};

export type CommentType = {
  commentBody: string;
  postId: string;
};
