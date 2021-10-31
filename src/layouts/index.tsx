import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { Layout } from 'antd';
import { IRouteComponentProps } from 'umi';

export default ({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) => {
  const { Content } = Layout;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};
