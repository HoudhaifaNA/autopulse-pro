type TSlugify = (str: string, seperator?: string) => string;

const slugify: TSlugify = (str, seperator = "_") => {
  return str.toLowerCase().split(" ").join(seperator);
};

export default slugify;
