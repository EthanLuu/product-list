import { Tabs } from 'antd';
import { ProductForm, ProductTable } from './product';
import styles from './index.less';
import { fetchAllProducts, Product } from '@/models/products';
import { useEffect, useState } from 'react';
import useRequest from '@ahooksjs/use-request';

export default () => {
  const { data, loading } = useRequest(() => fetchAllProducts());
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (!data) return;
    setProducts([...(data as Product[])]);
  }, [loading]);

  return (
    <div className={styles.wrapper}>
      <Tabs
        defaultValue="products"
        tabPosition="left"
        className={styles.tabs}
        size={'large'}
      >
        <Tabs.TabPane tab="商品数据" key="products">
          <ProductTable
            products={products}
            setProducts={setProducts}
            loading={loading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="添加商品"
          key="addProduct"
          className={styles.addProduct}
        >
          <ProductForm products={products} setProducts={setProducts} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="网站数据" key="webInfo">
          网站数据
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
