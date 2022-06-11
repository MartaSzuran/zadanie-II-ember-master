import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class PostModel extends Model {
  @attr('string') owner;
  @attr('string') title;
  @attr('string') body;
  @attr('boolean', { defaultValue: false }) isDeleted;
  @attr('date', { defaultValue: () => new Date() }) createdAt;
  @belongsTo('user', { autoSave: true }) owner;
  @hasMany('like') likes;
}
