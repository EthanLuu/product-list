import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@/components/Loading/Loading',
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/Home/home' },
        { exact: true, path: '/products', component: '@/pages/Product/list' },
        {
          exact: true,
          path: '/products/detail/:id',
          component: '@/pages/Product/detail',
        },
        {
          exact: true,
          path: '/products/search',
          component: '@/pages/Product/search',
        },
        {
          exact: true,
          path: '/management',
          component: '@/pages/Management/index',
        },
      ],
    },
  ],
  fastRefresh: {},
  title: '东鑫电器商行',
});
