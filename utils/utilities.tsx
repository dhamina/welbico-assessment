export const CheckEmail = (email: string): any => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(email)) {
    return email
  } else {
    return {
      error: "Enter a valid email address",
    };
  }
};
export const convertArrayToObject = (array: any[], key: string | number) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};