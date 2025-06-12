import { helper } from '@ember/component/helper';

export function formatDate([datetime], { format = 'YYYY-MM-DD' } = {}) {
  return window.moment(datetime).format(format);
}

export default helper(formatDate);
