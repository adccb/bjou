// find the most recent monday
export const getWeekHead = (date = new Date()) => 
  (date.setDate(date.getDate() - (date.getDay() || 6)), date)
