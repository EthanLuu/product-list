import { Tabs } from 'antd';
import { ProductTable } from './product';
import styles from './product.less';

export default () => {
  return (
    <div className={styles.wrapper}>
      <Tabs defaultValue="products" tabPosition="left">
        <Tabs.TabPane tab="商品数据" key="products">
          <ProductTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="添加商品" key="addProduct"></Tabs.TabPane>
        <Tabs.TabPane tab="网站数据" key="webinfo">
          网站数据
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
