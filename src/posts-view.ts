import './style.css';
import './posts.css';
import { Subscriber, Publisher, PostsManager } from './post-model';

export class PostsView implements Subscriber {
  postTitleElement: HTMLHeadingElement | null = null;
  postDescription: HTMLParagraphElement | null = null;
  prevButton: HTMLButtonElement | null = null;
  nextButton: HTMLButtonElement | null = null;

  constructor() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
        <div class="container">
        <section>
        <nav>
         <button data-testid="prev-button">< previous</button>
         <h2></h2>
         <button data-testid="next-button">next ></button>
        </nav>
        <p class="post-desc" data-testid="post-desc"> </p>
        </section>
            <section>
            <button> View Comments </button>
            <p class="comments">Comments of current post go here</p>
        </section>
        </div>
      `;

    this.postTitleElement = document.querySelector('h2');
    this.postDescription = document.querySelector('[data-testid="post-desc"]');
    this.prevButton = document.querySelector('[data-testid="prev-button"]');
    this.nextButton = document.querySelector('[data-testid="next-button"]');
    console.assert(this.postTitleElement !== null);
    console.assert(this.postDescription !== null);
    console.assert(this.prevButton !== null);
    console.assert(this.nextButton !== null);
  }

  update(manager: Publisher) {
    // Update the UI.
    // first we need to figure out who is calling us.
    //
    if (manager instanceof PostsManager) {
      // Check if model is in avaialble state, if so we are good to consume the posts data
      // on the other hand, if the status is pending, that means, somone
      // has initiated a data fetch, but the data has not arrived yet.
      // in this case, we would like to let user know about the progress.
      // In this case time that might need to bring data from server is unknown, we can only show an indefinite progress. (Loading...)
      // If the model goes into failure state, that also need to be
      // made known to user.

      const modelStatus = manager.getModelStatus();
      switch (modelStatus) {
        case 'available': {
          const post = manager.currentPost();
          if (this.postTitleElement) {
            this.postTitleElement.textContent =
              post?.title ?? 'title is missing';
          }
          if (this.postDescription) {
            this.postDescription.textContent = post?.body ?? 'body is missing';
          }

          break;
        }
        case 'pending': {
          if (this.postTitleElement) {
            this.postTitleElement.textContent = 'Loading...';
          }
          if (this.postDescription) {
            this.postDescription.textContent = 'Loading...';
          }
          break;
        }
        case 'failure': {
          if (this.postTitleElement) {
            this.postTitleElement.textContent =
              'Failed to fetch data now, please retry again';
          }
          if (this.postDescription) {
            this.postDescription.textContent = 'Failed, retry again!';
          }
          break;
        }
      }
    }
  }
}
