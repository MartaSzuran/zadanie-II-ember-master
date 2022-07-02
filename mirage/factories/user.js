import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  username: faker.name.firstName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  photoURL: faker.image.avatar(),
});
