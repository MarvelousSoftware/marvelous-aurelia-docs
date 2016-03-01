import moment from 'moment';

export class DateTimeFormatValueConverter {
  toView(value) {
    return moment(value).format('D/M/YYYY H:mm:ss');
  }
}