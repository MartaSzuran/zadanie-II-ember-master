import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';

export default class ApplicationRoute extends Route {
  @storageFor('users') users;

  async beforeModel() {
    console.log('dupa', await this.users.get('username'));
    await this.users.set('username', 'podmienione');
    console.log('dupa2', await this.users.get('username'));
  }
}
