export const fetchIntro = async () => {
  const response = await fetch('/api/intro');
  const data = await response.json();
  return data;
};
