import { Post, Comment } from './post-model';
import { get } from './network';
import { PostArraySchema, CommentSchema } from './post-model';

export async function getPosts(): Promise<Post[]> {
  const data = await get('https://jsonplaceholder.typicode.com/posts');

  const validatedData = PostArraySchema.parse(data[0]);
  return validatedData;
}

export function getCommentsForPost(postId: number): Promise<Comment[]> {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  return get(url);
}
