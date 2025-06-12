import { helper } from '@ember/component/helper';

export function formatHour([datetime]) {
  return parseInt(window.moment(datetime).format('H'), 10); // 0–23
}

export default helper(formatHour);
