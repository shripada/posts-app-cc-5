import { PostsView } from './posts-view';
import { CommentsManger, PostsManager } from './post-model';
import { PostController } from './post-controller';

const postView = new PostsView();
const postManager = new PostsManager();
const commentsManager = new CommentsManger();

new PostController(postView, postManager, commentsManager);
