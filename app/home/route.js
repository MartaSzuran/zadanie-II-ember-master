import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service router;
  @storageFor('logged-as') loggesAs;

  beforeModel() {
    const userId = this.loggesAs.get('id');
    if (!userId) {
      this.router.transitionTo('/login');
      return;
    }
  }
}
