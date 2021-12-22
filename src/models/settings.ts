const local = 'http://localhost:233';

export const fetchSiteSetting = async (name: string) => {
  const response = await fetch(`${local}/settings/${name}`);
  const data = await response.json();
  return data.item;
};

export const updateSiteSetting = async (name: string, value: string) => {
  const body: any = {
    value,
  };
  const response = await fetch(`${local}/settings/${name}`, {
    body: JSON.stringify(body),
    method: 'PUT',
  });
  const data = await response.json();
  return data;
};
