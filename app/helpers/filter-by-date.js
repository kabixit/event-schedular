import { helper } from '@ember/component/helper';

export function filterByDate([events, date]) {
  if (!events || !date) return [];
  return events.filter(event => 
    window.moment(event.date).format('YYYY-MM-DD') === date
  );
}

export default helper(filterByDate);