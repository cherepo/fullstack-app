var casual = require('casual');

module.exports = (function () {
  let i = 0;
  let result = [];
  do {
    i += 1;
    result.push(
      {
        id: i,
        uuid: `${i}-uuid`,
        title: casual.title,
        author: casual.full_name
      }
    )
  } while (i < 50);
  return result;
}());
