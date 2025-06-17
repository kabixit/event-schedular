import { helper } from '@ember/component/helper';

export function filterByHour([events, date, hour]) {
  if (!events || !date) return [];
  return events.filter(event => 
    window.moment(event.date).format('YYYY-MM-DD') === date && 
    window.moment(event.date).hour() === hour
  );
}

export default helper(filterByHour);