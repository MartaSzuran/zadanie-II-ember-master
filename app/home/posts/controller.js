import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
import { action } from '@ember/object';

export default class HomePostsController extends Controller {
  @tracked dateFrom;
  @tracked dateTo;

  queryParams = ['dateFrom', 'dateTo'];

  get shouldBeFilteredBetweenDates() {
    return Boolean(this.startDate && this.endDate);
  }

  get shouldBeFilteredFromDates() {
    return !this.shouldBeFilteredBetweenDates && Boolean(this.startDate);
  }

  get shouldBeFilteredToDates() {
    return !this.shouldBeFilteredBetweenDates && Boolean(this.endDate);
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
}
