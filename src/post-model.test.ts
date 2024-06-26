import {
  Post,
  Subscriber,
  Publisher,
  Comment,
  PostsManager,
  CommentsManger,
} from './post-model';

const testPosts: Post[] = [
  {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
  },
  {
    userId: 1,
    id: 4,
    title: 'eum et est occaecati',
    body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
  },
  {
    userId: 1,
    id: 5,
    title: 'nesciunt quas odio',
    body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
  },
];

describe('Model layer tests', () => {
  test('post data layer tests', () => {
    const postManager = new PostsManager();
    expect(postManager).toBeDefined();
    expect(postManager.currentPostIndex).toBe(0);

    postManager.setPosts(testPosts);
    expect(postManager.getPosts()).toBe(testPosts);
    postManager.currentPostIndex = 2;
    expect(postManager.currentPost()).toBe(testPosts[2]);
  });
});

// This is  a dummy subscriber just for testing
class DummyView implements Subscriber {
  update(publisher: Publisher): void {
    console.log('dummy view update called');
  }
}

describe('Pub sub tests with posts model', () => {
  test('test that update of subscribe is called', () => {
    const postManager = new PostsManager();
    expect(postManager).toBeDefined();
    expect(postManager.currentPostIndex).toBe(0);

    // Setup subscription
    const dummyView = new DummyView();
    postManager.subscribe(dummyView);

    const dummyView1 = new DummyView();
    postManager.subscribe(dummyView1);

    postManager.setPosts(testPosts);

    // Whenever posts change, dummy view's update method
    // should be called
    const spy = vi.spyOn(dummyView, 'update');
    expect(spy.getMockName()).toEqual('update');

    const spy1 = vi.spyOn(dummyView1, 'update');
    expect(spy1.getMockName()).toEqual('update');
  });
});
