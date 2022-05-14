import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class LoginController extends Controller {
  @action 
  onLoginChange () {
    console.log('onLoginChange triggered');
  }

  @action 
  onPasswordChange () {
    console.log('onPasswordChange triggered');
  }
  
  @action 
  onSubmit () {
    console.log('onSubmit triggered');
  }
}
