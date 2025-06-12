import { helper } from '@ember/component/helper';

export function momentFormat([date, format]) {
  return window.moment(date).format(format);
}

export default helper(momentFormat);
