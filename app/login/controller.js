import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Auth0Lock from 'auth0-lock';
const clientId = 'G33y6kTlRQ4AI46vQJbHujWc4i1wUhTG';
const domain = 'dev-ows07sv1.us.auth0.com';

export default class LoginController extends Controller {
  @service store;
  @service session;
  @tracked loginValue;
  @tracked passwordValue;

  @action
  onLoginChange(event) {
    this.loginValue = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.passwordValue = event.target.value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();
    const { loginValue, passwordValue } = this;
    await this.session.loginUser(loginValue, passwordValue);
  }

  @action
  async onAuthLoginOrRegister() {
    const options = { auth: { redirect: false } };
    const lock = new Auth0Lock(clientId, domain, options);
    lock.show({ allowedConnections: ['google-oauth2'] });

    lock.on('authenticated', (authResult) => {
      lock.getUserInfo(authResult.accessToken, async (error, profileResult) => {
        if (error) {
          console.log('error', error);
          return;
        }

        const accessToken = authResult.accessToken;
        const profile = profileResult;

        console.log('success', accessToken, profile);

        await this.session.loginOrRegisterBy0auth(profile);
      });
    });
  }
}
