export const formatPhoneNumber = (phone_number: string): Promise<string> => {
  let v = phone_number.replace(/[^0-9]/g, "").slice(0, 12);
  let l = v.length;
  if (v.length > 3 && v.slice(0, 3) === "998") {
    v = v.slice(3, v.length);
    l = v.length;
  } else {
    v = "";
    l = 0;
  }
  let lastValue;
  if (l < 3) {
    const reg = new RegExp(`^([0-9]{2})`);
    lastValue = v?.replace(reg, "$1");
  } else if (l < 6) {
    const reg = new RegExp(`^([0-9]{2})([0-9]{${l - 2}})`);
    lastValue = v?.replace(reg, "$1 $2");
  } else if (l < 8) {
    const reg = new RegExp(`^([0-9]{2})([0-9]{3})([0-9]{${l - 5}})`);
    lastValue = v?.replace(reg, "$1 $2-$3");
  } else {
    const reg = new RegExp(`^([0-9]{2})([0-9]{3})([0-9]{2})([0-9]{${l - 7}})`);
    lastValue = v?.replace(reg, "$1 $2-$3-$4");
  }

  return Promise.resolve(`+998 ${lastValue}`);
};
