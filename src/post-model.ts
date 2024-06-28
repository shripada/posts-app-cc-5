import { ActualPublisher } from './pub-sub';
import { ModelStatus } from './model-status';
export interface Post {
  /** id of user posting this post*/
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

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

  getCommentsForPost(postId: number) {
    return this.commentsMap.get(postId);
  }
}
