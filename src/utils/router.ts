import { useLocation } from 'react-router';

export const useRouterKey = () => {
  const routerMap: { [key: string]: string } = {
    '/': 'home',
    '/products': 'products',
    '/products/detail': 'productdetail',
  };
  const location = useLocation();
  return routerMap[location.pathname];
};

export const useSearchParams = () => {
  const location = useLocation();
  const queryString = location.search;
  return new URLSearchParams(queryString);
};

interface Param {
  key: string;
  value: string | null;
}

export const getSearchHref = (key: string, value: string | null) => {
  const params = new URLSearchParams(window.location.search);
  if (!value) {
    params.delete(key);
  } else {
    params.set(key, value);
  }
  return `?${params.toString()}`;
};

export const getMulSearchHref = (newParams: Param[]) => {
  const params = new URLSearchParams(window.location.search);
  newParams.map(({ key, value }) => {
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });
  return `?${params.toString()}`;
};
