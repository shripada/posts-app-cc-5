import { ActualPublisher } from './pub-sub';
import { ModelStatus } from './model-status';
import { z } from 'zod';

export const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const postArraySchema = z.array(postSchema);

export type Post = z.infer<typeof postSchema>;

export const commentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

export const commentsArraySchema = z.array(commentSchema);

export type Comment = z.infer<typeof commentSchema>;
export interface PostsModel {
  setPosts: (posts: Post[]) => void;
  getPosts: () => Post[];
  currentPost: () => Post | undefined;
  setCurrentPostIndex: (newIndex: number) => void;
  getCurrentPostIndex: () => number;
}

export interface CommentsModel {
  commentsMap: Map<number, Comment[]>;
  setCommentsForPost: (comments: Comment[], postId: number) => void;
  getCommentsForPost: (postId: number) => Comment[] | undefined;
}

export class PostsManager extends ActualPublisher implements PostsModel {
  public currentPostIndex: number = 0;
  posts: Post[] = [];
  public modelStatus: ModelStatus = new ModelStatus(this);

  // states in which model can be in
  // 1. pending
  // 2. available
  // 3. failure

  currentPost(): Post | undefined {
    return this.posts[this.currentPostIndex];
  }

  setPosts(posts: Post[]) {
    this.posts = posts;
    this.modelStatus.setModelStatus('available');
    this.updateSubscribers();
  }

  getPosts() {
    return this.posts;
  }

  setCurrentPostIndex(newIndex: number) {
    const normalisedIndex = Math.max(
      0,
      Math.min(newIndex, this.posts.length - 1)
    );
    this.currentPostIndex = normalisedIndex;
    this.updateSubscribers();
  }

  getCurrentPostIndex(): number {
    return this.currentPostIndex;
  }
}

export class CommentsManger extends ActualPublisher implements CommentsModel {
  commentsMap: Map<number, Comment[]> = new Map();

  public modelStatus: ModelStatus = new ModelStatus(this);

  setCommentsForPost(comments: Comment[], postId: number) {
    this.commentsMap.set(postId, comments);
    this.modelStatus.setModelStatus('available');
    this.updateSubscribers();
  }

  getCommentsForPost(postId: number): Comment[] | undefined {
    return this.commentsMap.get(postId);
  }
}
