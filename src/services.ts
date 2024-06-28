import { Post, Comment } from './post-model';
import { get } from './network';

export function getPosts(): Promise<Post[]> {
  return get('https://jsonplaceholder.typicode.com/posts');
}

export function getCommnetsForPost(postId: number): Promise<Comment[]> {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  return get(url);
}
