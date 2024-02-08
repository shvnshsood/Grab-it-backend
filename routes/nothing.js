const date = new Date();

console.log (date);

const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

console.log(lastMonth);
console.log(previousMonth);