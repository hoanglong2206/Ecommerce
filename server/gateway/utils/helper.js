function firstLetterUppercase(str) {
  const valueString = str.toLowerCase();
  return valueString
    .split(" ")
    .map(
      (value) =>
        `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`
    )
    .join(" ");
}

function lowerCase(str) {
  return str.toLowerCase();
}

const toUpperCase = (str) => {
  return str ? str.toUpperCase() : str;
};

function isEmail(email) {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regexExp.test(email);
}

function isDataURL(value) {
  const dataUrlRegex =
    /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\\/?%\s]*)\s*$/i;
  return dataUrlRegex.test(value);
}

module.exports = {
  firstLetterUppercase,
  lowerCase,
  toUpperCase,
  isEmail,
  isDataURL,
};
