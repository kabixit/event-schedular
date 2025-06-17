import { helper } from '@ember/component/helper';

export function todayDate() {
  return window.moment().format('YYYY-MM-DD');
}

export default helper(todayDate);