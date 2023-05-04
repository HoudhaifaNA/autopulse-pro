const convertPath = (path: string) => {
  if (process.env.NODE_ENV === "production") return `${path}.html`;
  return path;
};
export default convertPath;
