import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  username() {
    return faker.name.firstName();
  },

  password() {
    return faker.internet.password();
  },

  email() {
    return faker.internet.email();
  },

  image() {
    return faker.image.avatar();
  },
});
