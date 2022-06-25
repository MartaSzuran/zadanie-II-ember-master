import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | shared/user-selector', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    this.set('selectedAuthors', [{ username: 'Jacek' }]);
    this.set('options', [{ username: 'Jacek' }, { username: 'Placek' }]);
    this.set('chooseAuthors', () => {});
  });

  test('it renders', async function (assert) {
    await render(
      hbs`
      <Shared::UserSelector 
      @multipleType={{true}}
      @options={{this.options}} 
      @selected={{this.selectedAuthors}} 
      @onChange={{this.chooseAuthors}}/>`
    );
    assert.dom('.ember-power-select-multiple-options').exists();
  });

  test('dispaly initial user', async function (assert) {
    await render(
      hbs`
      <Shared::UserSelector 
      @multipleType={{true}}
      @options={{this.options}} 
      @selected={{this.selectedAuthors}} 
      @onChange={{this.chooseAuthors}}/>`
    );

    assert.dom('.ember-power-select-multiple-options').includesText('Jacek');
  });

  test('dispaly initial options', async function () {
    await render(
      hbs`
      <Shared::UserSelector 
      @multipleType={{true}}
      @options={{this.options}} 
      @selected={{this.selectedAuthors}} 
      @onChange={{this.chooseAuthors}}/>`
    );

    await click('.ember-basic-dropdown-trigger');

    const optionElements = findAll('.ember-power-select-options li');
    assert.dom(optionElements[0]).hasText('Jacek');
    assert.dom(optionElements[1]).hasText('Placek');
  });
});
