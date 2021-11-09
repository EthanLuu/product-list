import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { ConfigProvider, Layout } from 'antd';
import { IRouteComponentProps } from 'umi';
import zhCN from 'antd/lib/locale/zh_CN';

export default ({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) => {
  const { Content } = Layout;
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};
