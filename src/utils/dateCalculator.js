import moment from "moment";

var currentDay = new Date();
const currentYear = new Date().getFullYear();

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
export const getThisWeek = () => {
  var first = currentDay.getDate() - currentDay.getDay() - 1; // First day is the day of the month - the day of the week - one to start with saturday
  var last = first + 6; // last day is the first day + 6

  return [
    new Date(currentDay.setDate(first)).toUTCString(),
    new Date(currentDay.setDate(last)).toUTCString(),
  ];
};
export const getCurrentMonth = () => {
  return [
    new Date(currentDay.getFullYear(), currentDay.getMonth(), 1),
    new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0),
  ];
};

export const getCurrentYear = () => {
  return [new Date(currentYear, 0, 1), new Date(currentYear, 11, 31)];
};
