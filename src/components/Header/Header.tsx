import { useRouterKey } from '@/utils/router';
import { Input, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Header.less';

const Title = () => {
  return <h1 className={styles.title}>张家港市杨舍镇东鑫电器商行</h1>;
};

export const Header = () => {
  const selectedKey = useRouterKey();

  return (
    <Layout.Header className={styles.header}>
      <Link to="/">
        <Title />
      </Link>
      <Menu
        mode={'horizontal'}
        className={styles.menu}
        selectedKeys={[selectedKey]}
      >
        <Menu.Item key="home">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="products">
          <Link to="/products">商品列表</Link>
        </Menu.Item>
      </Menu>
      <Input.Search
        className={styles.search}
        placeholder="请输入关键词"
      ></Input.Search>
    </Layout.Header>
  );
};
