import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HomePostsController extends Controller {
  @service store;
  @tracked dateFrom;
  @tracked dateTo;
  @tracked sort;
  @tracked selectedAuthors = [];

  constructor() {
    super(...arguments);
    this.authors = this.store.findAll('user');
  }

  queryParams = ['dateFrom', 'dateTo', 'sort'];

  @action
  chooseDestination(city) {
    this.set('destination', city);
  }

  get shouldBeFilteredBetweenDates() {
    return Boolean(this.startDate && this.endDate);
  }

  get shouldBeFilteredFromDates() {
    return !this.shouldBeFilteredBetweenDates && Boolean(this.startDate);
  }

  get shouldBeFilteredToDates() {
    return !this.shouldBeFilteredBetweenDates && Boolean(this.endDate);
  }

  get sortLabel() {
    if (!this.sort) {
      return '';
    }
    return this.sort === 'ASC' ? '↓' : '↑';
  }

  get startDate() {
    if (!this.dateFrom) {
      return null;
    }
    return moment(this.dateFrom).startOf('day');
  }

  get endDate() {
    if (!this.dateTo) {
      return null;
    }
    return moment(this.dateTo).endOf('day');
  }

  get minDate() {
    return this.startDate?.toDate();
  }

  get maxDate() {
    return this.endDate?.toDate();
  }

  get filteredPosts() {
    const posts = this.model;
    if (this.shouldBeFilteredByDate) {
      return posts.filter((post) => {
        return moment(post.createdAt).isBetween(
          this.startDate,
          this.endDate,
          undefined,
          '[]'
        );
      });
    }

    if (this.shouldBeFilteredFromDates) {
      return posts.filter((post) => {
        return moment(post.createdAt).isSameOrAfter(this.startDate);
      });
    }

    if (this.shouldBeFilteredToDates) {
      return posts.filter((post) => {
        return moment(post.createdAt).isSameOrBefore(this.endDate);
      });
    }
    return posts;
  }

  get sortedPosts() {
    if (this.sort === 'ASC') {
      return this.filteredPosts.sortBy('createdAtMiliseconds');
    }

    if (this.sort === 'DESC') {
      return this.filteredPosts.sortBy('createdAtMiliseconds').reverse();
    }

    return this.filteredPosts;
  }

  @action onStartDateChange(date) {
    this.dateFrom = moment(date).format('YYYY-MM-DD');
  }

  @action onEndDateChange(date) {
    this.dateTo = moment(date).format('YYYY-MM-DD');
  }

  @action
  clearFilters() {
    this.dateFrom = null;
    this.dateTo = null;
  }

  @action
  onSortToggle() {
    if (!this.sort) {
      return (this.sort = 'ASC');
    }

    if (this.sort === 'ASC') {
      return (this.sort = 'DESC');
    }

    this.sort = undefined;
  }

  @action
  chooseAuthors(authors) {
    this.selectedAuthors = authors;
  }
}
