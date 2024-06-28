import { get } from './network';

export interface Geo {
  lat: string;
  lng: string;
}

export interface Addres {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Addres;
  phone: string;
  website: string;
  company: Company;
}

/*
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
  */

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const delay = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

test('http get function tests', async () => {
  // test fetching a single value
  // fetching: https://jsonplaceholder.typicode.com/users/1
  const user: User = await get('https://jsonplaceholder.typicode.com/users/1');

  expect(user.name).toBe('Leanne Graham');

  // fetch comments which is an array
  const posts: Post[] = await get('https://jsonplaceholder.typicode.com/posts');
  // test fetching a plural > array
  expect(posts[0].title).toBe(
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
  );
}, 7000);
