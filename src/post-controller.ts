import { ZodError } from 'zod';
import { PostsManager, Post, CommentsManger, Comment } from './post-model';
import { PostsView } from './posts-view';
import { getPosts, getCommentsForPost } from './posts.service';

export class PostController {
  commentsManager: CommentsManger;
  postsManager: PostsManager;
  constructor(
    postView: PostsView,
    postManager: PostsManager,
    commentsManager: CommentsManger
  ) {
    this.commentsManager = commentsManager;
    this.postsManager = postManager;
    function handlePrevious(): void {
      const currentIndex = postManager.getCurrentPostIndex();
      postManager.setCurrentPostIndex(currentIndex - 1);
    }

    function handleNext(): void {
      const currentIndex = postManager.getCurrentPostIndex();
      postManager.setCurrentPostIndex(currentIndex + 1);
    }

    // We need to add post view as a subscriber to model
    postManager.subscribe(postView);
    // Setup event handlers for prev and next buttons.
    postView.nextButton?.addEventListener('click', handleNext);
    postView.prevButton?.addEventListener('click', handlePrevious);

    // Also associate the controller layer too.
    commentsManager.subscribe(postView);

    // Fetch all posts
    this.allPosts();

    // Setup event handling for the view comments button
    postView?.viewCommentsButton?.addEventListener('click', () => {
      // Get the current post id, and fetch the comments for it
      // in case they are not available yet.
      const currentPost = postManager.currentPost();
      if (undefined === currentPost) {
        return;
      }
      const comments = commentsManager.getCommentsForPost(currentPost.id);

      if (comments) {
        commentsManager.updateSubscribers();
      } else {
        this.commentsForPost(currentPost.id);
      }
    });
  }

  allPosts() {
    this.postsManager.modelStatus.setModelStatus('pending');
    getPosts()
      .then((posts) => this.postsManager.setPosts(posts))
      .catch((error: unknown) => {
        this.postsManager.modelStatus.setModelStatus('failure');
        console.log(error as ZodError);
      });
  }

  commentsForPost(postId: number): void {
    this.commentsManager.modelStatus.setModelStatus('pending');
    getCommentsForPost(postId)
      .then((comments) =>
        this.commentsManager.setCommentsForPost(comments, postId)
      )
      .catch(() => this.commentsManager.modelStatus.setModelStatus('failure'));
  }
}
