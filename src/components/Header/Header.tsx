import { Input, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Header.less';

const Title = () => {
  return <h1 className={styles.title}>张家港市杨舍镇东鑫电器商行</h1>;
};

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Link to="/">
        <Title />
      </Link>
      {/* <div className={styles.logo}>
        <Logo height="32" width="32" />
      </div> */}
      <Menu mode={'horizontal'} className={styles.menu}>
        <Menu.Item key="home">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="list">
          <Link to="/list">商品列表</Link>
        </Menu.Item>
      </Menu>
      <Input.Search
        className={styles.search}
        placeholder="请输入关键词"
      ></Input.Search>
    </Layout.Header>
  );
};