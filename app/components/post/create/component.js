import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PostCreateModalComponent extends Component {
  @service store;
  @service session;
  @tracked isShowCreateModal = false;
  @tracked title = '';
  @tracked content = '';

  get hasEmptyField() {
    return !(this.title && this.content);
  }

  @action
  onShowModal() {
    this.isShowCreateModal = true;
  }

  @action
  onHideModal() {
    this.isShowCreateModal = false;
    this.clearFields();
  }

  @action
  onTitleChange(event) {
    this.title = event.target.value;
  }

  @action
  onContentChange(event) {
    this.content = event.target.value;
  }

  @action
  async onSave() {
    const post = {
      owner: this.session.currentUser,
      title: this.title,
      body: this.content,
    };
    const postModel = this.store.createRecord('post', post);
    await postModel.save();
    this.clearFields();
    this.isShowCreateModal = false;
  }

  clearFields() {
    this.title = '';
    this.content = '';
  }
}
