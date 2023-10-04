const redirectToPath = (path: string) => {
  let convertedPath = path;

  if (process.env.NODE_ENV === "production") {
    convertedPath = `${path}.html`;
  }

  location.assign(convertedPath);
};

export default redirectToPath;
