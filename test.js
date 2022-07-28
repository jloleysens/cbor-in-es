const escapeSearchReservedChars = (str) => {
  return str.replace(/([-=&|!{}()\[\]^"~*?:\\\/\+])/g, '\\$1');
};