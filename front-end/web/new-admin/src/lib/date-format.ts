import moment from 'moment';
const format = 'YYYY/MM/DD HH:mm';

export const datetimeFormat = (datetime: string) => {
  return moment.utc(datetime).utcOffset(moment().utcOffset()).format(format);
}
