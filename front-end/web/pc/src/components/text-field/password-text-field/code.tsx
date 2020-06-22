export const pwRules = (pw: string) => {
  if (!pw) return false;
  if (pw.length < 8 || pw.length > 20) return false;
  const findNumber = pw.replace(/([0-9])+/g, '').length
  const findChar = pw.replace(/([a-zA-Z])+/g, '').length
  if (findNumber === 0) return false;
  if (findChar === 0) return false;
  if (findNumber === pw.length && findChar === pw.length) return false
  return true;
}