type TSlugify = (str: string, seperator?: string) => string;

const slugify: TSlugify = (str, seperator = "_") => {
  return str.toLowerCase().replace(/ +/g, seperator);
};

export default slugify;
