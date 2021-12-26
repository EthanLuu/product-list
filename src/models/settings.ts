export interface SiteSetting {
  key: string;
  name: string;
  value: string;
}

const api =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:233'
    : 'https://shopapi.ethanloo.cn';

export const fetchSiteSetting = async (name: string) => {
  const response = await fetch(`${api}/settings/${name}`);
  const data = await response.json();
  return data.item;
};

export const fetchSiteSettings = async () => {
  const response = await fetch(`${api}/settings/`);
  const data = await response.json();
  const settings: SiteSetting[] = [];
  const items = data.item;
  items?.map((item: any) => {
    settings.push(item.fields as SiteSetting);
  });
  return settings;
};

export const updateSiteSetting = async (name: string, value: string) => {
  const body: any = {
    value,
  };
  const response = await fetch(`${api}/settings/${name}`, {
    body: JSON.stringify(body),
    method: 'PUT',
  });
  const data = await response.json();
  return data;
};

export const updateSiteSettings = async (settings: SiteSetting[]) => {
  const response = await fetch(`${api}/settings/`, {
    body: JSON.stringify(settings),
    method: 'PUT',
  });
  const data = await response.json();
  return data;
};
