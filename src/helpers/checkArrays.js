export const checkArrays = (keys, res) => {
  let equal;

  if (keys.length === res.evacuation.shortcode.split('+').length) {
    keys.sort().map((key, index) => {
      if (
        key.toLowerCase() !==
        res.evacuation.shortcode
          .toLowerCase()
          .split('+')
          .sort()[index]
      ) {
        equal = false;
      } else {
        equal = true;
      }
    });
  }

  return equal;
};
