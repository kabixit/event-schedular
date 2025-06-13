import Ember from 'ember';

export default Ember.Helper.helper(function([month]) {
  const startDate = window.moment(month).startOf('month').startOf('week');
  const endDate = window.moment(month).endOf('month').endOf('week');
  
  const weeks = [];
  let currentDate = startDate.clone();
  
  while (currentDate.isBefore(endDate)) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push({
        date: currentDate.format('YYYY-MM-DD'),
        isCurrentMonth: currentDate.month() === window.moment(month).month()
      });
      currentDate.add(1, 'day');
    }
    weeks.push(week);
  }
  
  return weeks;
});