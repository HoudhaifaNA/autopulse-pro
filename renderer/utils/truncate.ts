const truncateText = (str: string, maxLength: number) => {
  let newString = str;
  let truncatedStr = str.split("").slice(0, maxLength).join("");
  if (str.length > maxLength) newString = `${truncatedStr}...`;
  return newString;
};
export default truncateText;
