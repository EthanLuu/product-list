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
        { exact: true, path: '/list', component: '@/pages/List/list' },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
  title: '东鑫电器商行',
});
