const local = 'http://localhost:8000';

export const fetchSiteSetting = async (name: string) => {
  const response = await fetch(`${local}/settings/${name}`);
  const data = await response.json();
  return data.item;
};
