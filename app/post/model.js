import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import moment from 'moment';

export default class PostModel extends Model {
  @attr('string') owner;
  @attr('string') title;
  @attr('string') body;
  @attr('boolean', { defaultValue: false }) isDeleted;
  @attr('date', { defaultValue: () => moment() }) createdAt;
  @belongsTo('user', { autoSave: true }) owner;
  @hasMany('like') likes;

  get createdAtMiliseconds() {
    return new Date(this.createdAt).getTime();
  }
}
