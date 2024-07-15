import './style.css';
import './posts.css';
import { Comment, CommentsManger, PostsManager } from './post-model';
import { Subscriber, Publisher } from './pub-sub';
import { createElement } from './lib/dom-utility';
export class PostsView implements Subscriber {
  postTitleElement: HTMLHeadingElement | null = null;
  postDescription: HTMLParagraphElement | null = null;
  prevButton: HTMLButtonElement | null = null;
  nextButton: HTMLButtonElement | null = null;
  viewCommentsButton: HTMLButtonElement | null = null;
  commentsList: HTMLUListElement | null = null;
  postId: number = 0;
  constructor() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
        <div class="container">
        <section>
        <nav>
         <button data-testid="prev-button" class="left-button">< previous</button>
         <h2></h2>
         <button data-testid="next-button" class="right-button">next ></button>
        </nav>
        <p class="post-desc" data-testid="post-desc"> </p>
        </section>
            <section>
            <button data-testid="view-comments"> View Comments </button>
            <ul class="comments" data-testid="comments-list">Comments of current post go here</ul>
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

    // Comments section
    this.viewCommentsButton = document.querySelector(
      '[data-testid="view-comments"]'
    );
    this.commentsList = document.querySelector('[data-testid="comments-list"]');
    console.assert(this.viewCommentsButton !== null);
    console.assert(this.commentsList !== null);
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

      const modelStatus = manager.modelStatus;
      switch (modelStatus.getModelStatus()) {
        case 'available': {
          const post = manager.currentPost();
          if (this.postTitleElement) {
            this.postTitleElement.textContent =
              post?.title ?? 'title is missing';
          }
          if (this.postDescription) {
            this.postDescription.textContent = post?.body ?? 'body is missing';
          }
          this.postId = manager.currentPost()?.id ?? 0;
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
    } else if (manager instanceof CommentsManger) {
      switch (manager.modelStatus.getModelStatus()) {
        case 'pending': {
          this.commentsList!.textContent = 'Loading...';
          break;
        }
        case 'available': {
          // this.commentsList!.textContent = JSON.stringify(
          //   manager.getCommentsForPost(this.postId),
          //   null,
          //   4
          // );
          this.buildCommentsList(manager.getCommentsForPost(this.postId));
          break;
        }
        case 'failure': {
          this.commentsList!.textContent =
            'Failed to fetch comments, please try again later';
          break;
        }
      }
    }
  }

  buildCommentsList(comments: Comment[] | undefined) {
    if (comments) {
      const commentListItems: Node[] = [];
      comments.forEach((comment: Comment) => {
        /*
           <li> 
              <h4>{comments.email}</h4>
              <p>{comments.body}</p>
           </li>
        */
        const h4 = createElement('h4', { style: 'color:green' }, comment.email);
        const p = createElement(
          'p',
          { style: 'color:blue; font-size:1.2rem' },
          comment.body
        );
        commentListItems.push(
          createElement('li', { style: 'color:red' }, h4, p)
        );
      });

      // We also now host this list of li items under our
      // ul element (which is the host)
      this.commentsList?.replaceChildren(...commentListItems);
    }
  }
}
