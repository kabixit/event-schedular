import { helper } from '@ember/component/helper';

export function formatTime([datetime]) {
  return window.moment(datetime).format('HH:mm'); // 24-hour; use 'h:mm A' for AM/PM
}

export default helper(formatTime);
