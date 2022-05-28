import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  async beforeModel() {
    const user1 = {
      id: 1,
      username: 'admin',
      password: 'admin123',
      email: 'admin@admin.com',
      isAdmin: true,
      photoURL:
        'https://d-art.ppstatic.pl/kadry/k/r/e3/2e/5ee3783889b3d_o_large.jpg',
    };
    const user2 = {
      id: 2,
      username: 'user',
      password: 'user123',
      email: 'user@user.com',
      photoURL:
        'https://d-art.ppstatic.pl/kadry/k/r/68/7d/5ee36919e4c79_o_large.jpg',
    };

    const user1Model = this.store.createRecord('user', user1);
    const user2Model = this.store.createRecord('user', user2);

    await user1Model.save();
    await user2Model.save();

    const post1 = {
      id: 1,
      title: 'Testowy 1',
      body: 'Zawartość testowa 1',
      owner: user1Model,
    };
    const post2 = {
      id: 2,
      title: 'Testowy 2',
      body: 'Zawartość testowa 2',
      owner: user1Model,
    };
    const post3 = {
      id: 3,
      title: 'Testowy 3',
      body: 'Zawartość testowa 3',
      owner: user2Model,
    };

    const post1Model = this.store.createRecord('post', post1);
    const post2Model = this.store.createRecord('post', post2);
    const post3Model = this.store.createRecord('post', post3);

    await post1Model.save();
    await post2Model.save();
    await post3Model.save();

    const like1 = {
      id: 1,
      user: user1Model,
      post: post3Model,
    };

    const like1Model = this.store.createRecord('like', like1);
    await like1Model.save();
  }
}
