import { faker } from '@faker-js/faker';

test('create random book using faker', () => {
  console.log(faker.string.sample());
  console.log(faker.image.avatar());
  console.log(faker.person.firstName());
  console.log(faker.person.lastName());
  console.log(faker.person.fullName());

  function createRandomUser() {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }

  const users = faker.helpers.multiple(createRandomUser, {
    count: 5,
  });
  console.table(users);
});
