import { Tabs } from 'antd';
import { ProductTable } from '@/components/ProductTable';
import styles from './index.less';
import {
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  Product,
} from '@/models/products';
import { useEffect, useState } from 'react';
import useRequest from '@ahooksjs/use-request';
import { ProductForm } from '@/components/ProductForm/ProductForm';
import { SetttingsForm } from '@/components/SettingsForm';

export default () => {
  const { data, loading } = useRequest(fetchAllProducts);
  const { data: categories = [], loading: loadingCategories } =
    useRequest(fetchCategories);
  const { data: brands = [], loading: loadingBrands } = useRequest(fetchBrands);
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
            loading={loading || loadingCategories || loadingBrands}
            categories={categories}
            brands={brands}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="添加商品"
          key="addProduct"
          className={styles.addProduct}
        >
          <ProductForm products={products} setProducts={setProducts} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="网站设置" key="siteSettings">
          <SetttingsForm />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
