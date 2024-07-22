const useColoredText = (text: string) => {
  const PATTERN = /_(RD|GR)/g;

  const [content, colorClass] = text.split(PATTERN);

  return [content, colorClass];
};

export default useColoredText;
