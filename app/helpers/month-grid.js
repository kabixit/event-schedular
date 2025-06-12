import Ember from 'ember';

export function monthGrid([month] /*, hash*/) {
  let startOfMonth = moment(month).startOf('month');
  let endOfMonth = moment(month).endOf('month');

  // Start from the Monday before or equal to start of month
  let startDate = moment(startOfMonth).startOf('week').add(1, 'day');
  if (startDate.day() !== 1) {
    startDate = startDate.subtract(startDate.day() - 1, 'days');
  }

  let grid = [];
  let date = startDate.clone();

  // Create a 6-week grid (6 rows × 7 days)
  for (let week = 0; week < 6; week++) {
    let weekRow = [];
    for (let day = 0; day < 7; day++) {
      weekRow.push({
        date: date.format('YYYY-MM-DD'),
        isCurrentMonth: date.month() === startOfMonth.month()
      });
      date.add(1, 'day');
    }
    grid.push(weekRow);
  }

  return grid;
}

export default Ember.Helper.helper(monthGrid);
