import { Post, Comment } from './post-model';
import { get } from './network';
import { postArraySchema, commentsArraySchema } from './post-model';

export async function getPosts(): Promise<Post[]> {
  return get<typeof postArraySchema, Post[]>(
    'https://2f7eaa73-e82b-425a-bb9b-e4abe79805b0.mock.pstmn.io/posts',
    postArraySchema
  );
}

export async function getCommentsForPost(postId: number): Promise<Comment[]> {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  return get<typeof commentsArraySchema, Comment[]>(url, commentsArraySchema);
}
