export const getDateYYYYMMDD = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const mm = month < 10 ? '0' + month : month;
  const dd = day < 10 ? '0' + day : day;

  return `${year}-${mm}-${dd}`;
}