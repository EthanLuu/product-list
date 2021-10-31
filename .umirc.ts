import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/home' },
        { exact: true, path: '/list', component: '@/pages/list' },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
  title: '东鑫电器商行',
});
