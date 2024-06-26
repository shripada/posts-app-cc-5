import { PostsManager, Post } from './post-model';
import { PostsView } from './posts-view';

export class PostController {
  constructor(postView: PostsView, postManager: PostsManager) {
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

    postManager.setModelStatus('pending');
    this.fetchPosts()
      .then((posts) => postManager.setPosts(posts))
      .catch(() => postManager.setModelStatus('failure'));
  }

  async fetchPosts(): Promise<Post[]> {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const posts = (await response.json()) as Post[];
      const delay = (timeout: number) =>
        new Promise((resolve) => setTimeout(resolve, timeout));

      await delay(5000);
      return posts;
    } catch (error: unknown) {
      throw new Error(
        'Could not fetch the posts for now, please try again later'
      );
    }
  }
}
