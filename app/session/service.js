import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @service store;
  @storageFor('logged-as') loggedAs;
  @tracked currentUser;

  get isUserLoggedIn() {
    return Boolean(this.loggedAs.get('id'));
  }

  async loginUser(login, password) {
    const users = await this.store.query('user', {
      filter: { username: login, password: password },
    });
    const isUserExist = !!users.length;
    if (isUserExist) {
      const user = users.firstObject;
      this.loggedAs.set('id', user.id);
      window.location.href = '/';
    }
  }

  logoutUser() {
    this.loggedAs.set('id', null);
    window.location.href = '/login';
  }

  async setCurrentUser() {
    const userId = this.loggedAs.get('id');
    const user = await this.store.findRecord('user', userId);
    // console.log(user.username);
    this.currentUser = user;
  }

  async loginOrRegisterBy0auth(profile) {
    const isUserExist = false;
    if (isUserExist) {
      //add function to login
      return;
    }

    const username = profile.nickname;
    const email = profile.email;
    const password = '';
    const photoURL = profile.picture;

    const user = await this.store
      .createRecord('user', {
        username,
        email,
        password,
        photoURL,
      })
      .save();

    this.loggedAs.set('id', user.id);
    window.location.href = '/';
  }
}
