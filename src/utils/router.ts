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
