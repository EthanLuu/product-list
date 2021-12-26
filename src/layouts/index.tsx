import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { IRouteComponentProps } from 'umi';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import styles from './index.less';

const ErrorBoundary = () => {
  return <div>Error</div>;
};

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
        <Content className={styles.content}>{children}</Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};
