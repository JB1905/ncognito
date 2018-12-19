export const checkArrays = (keys, res) => {
  let equal;

  if (keys.length === res.evacuation.shortcode.split('+').length) {
    keys.sort().map((key, index) => {
      if (key !== res.evacuation.shortcode.split('+').sort()[index]) {
        equal = false;
      } else {
        equal = true;
      }
    });
  }

  return equal;
};
