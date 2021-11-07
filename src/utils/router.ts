import { useLocation } from 'react-router';

export const useRouterKey = () => {
  const routerMap: { [key: string]: string } = {
    '/': 'home',
    '/list': 'list',
    '/product': 'product',
  };
  const location = useLocation();
  return routerMap[location.pathname];
};
