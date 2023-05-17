const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const tmrdd = String(today.getDate() + 1).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

export const todayDate = yyyy + '-' + mm + '-' + dd;

export const tomorrowDate = yyyy + '-' + mm + '-' + tmrdd;
