import { Input, Layout, Menu } from 'antd';
import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRouterKey } from '@/utils/router';
import styles from './index.less';

const Title = () => {
  return <h1 className={styles.title}>张家港市杨舍镇东鑫电器商行</h1>;
};

export const Header = () => {
  const selectedKey = useRouterKey();
  const history = useHistory();
  const search = useRef<Input>(null);

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
        <Menu.Item key="management">
          <Link to="/management">商品管理</Link>
        </Menu.Item>
      </Menu>
      <Input.Search
        ref={search}
        className={styles.search}
        placeholder={'请输入关键词'}
        onSearch={(key, event) => {
          history.push(`/products/search?key=${key}`);
          if (search.current) {
            search.current.setValue('');
          }
        }}
        name="q"
        type="text"
        allowClear
      ></Input.Search>
    </Layout.Header>
  );
};
