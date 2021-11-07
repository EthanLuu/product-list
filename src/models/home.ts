export const fetchNotice = async () => {
  const response = await fetch('/api/notice');
  const data = await response.json();
  return data;
};
