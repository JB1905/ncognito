export const checkArrays = (keys, res) => {
  const shortcode = res.evacuation.shortcode.toLowerCase().split('+');

  let equal = false;

  if (keys.length === shortcode.length) {
    keys.sort().map((key, index) => {
      if (key.toLowerCase() === shortcode.sort()[index]) equal = true;
    });
  }

  return equal;
};
