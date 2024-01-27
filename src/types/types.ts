/*
==========
 userId, blogId, and id  type number is possible, though I am setting 
 types as string because of fast query with mongoDB
 ==========
*/

export type TBlog = { userId: string; id: string; title: string; body: string };

export type TComment = {
  blogId: string;
  id: string;
  name: string;
  email: string;
  body: string;
};
