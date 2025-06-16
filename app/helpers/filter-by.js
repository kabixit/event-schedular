import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  const [array, ...filters] = params;
  if (!array) return [];
  
  return array.filter(item => {
    for (let i = 0; i < filters.length; i += 2) {
      const key = filters[i];
      const value = filters[i+1];
      
      if (key === 'date') {
        if (window.moment(item.date).format('YYYY-MM-DD') !== value) return false;
      } 
      else if (key === 'hour') {
        if (window.moment(item.date).hour() !== value) return false;
      }
      else if (item[key] !== value) {
        return false;
      }
    }
    return true;
  });
});