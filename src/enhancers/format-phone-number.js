export default number => {
  number = number.replace(/[^\d]/g, '');
  const regex = /^(\d{0,3})?(\d{0,3})?(\d{0,4})?$/;
  const [, area, prefix, lineNum] = number.match(regex);

  let n = '';
  if (area) n += '(' + area;
  if (prefix) n += ') ' + prefix;
  if (lineNum) n += '-' + lineNum;

  return n;
};
