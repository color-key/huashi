export const getStringByteLength = (str: string) => {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    const length = str.charCodeAt(i);
    if( length >= 0 && length <= 128 ) {
      len += 1;
    } else {
      len += 2;
    }
  }
  return len;
};

