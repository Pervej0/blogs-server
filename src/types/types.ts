/*
==========
 blogId, and id  type number is possible, though I am setting 
 types as string because of fast query with mongoDB genarated _id
 ==========
*/

export type TBlog = {
  userId: number;
  id?: string;
  title: string;
  body: string;
};

// Comment body field name change into commentBody for the better understand
export type TComment = {
  blogId: string;
  id: string;
  name: string;
  email: string;
  commentBody: string;
};
