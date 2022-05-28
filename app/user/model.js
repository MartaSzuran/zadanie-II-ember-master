import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') username;
  @attr('string') password;
  @attr('string') email;
  @attr('string') photoURL;
  // two ways of createing default values
  @attr('boolean', { defaultValue: false }) isDeleted;
  @attr('boolean', {
    defaultValue() {
      return false;
    },
  })
  isAdmin;

  @hasMany('post') posts;
  @hasMany('like') likes;
}
