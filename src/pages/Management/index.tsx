import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { ProductForm, ProductTable, SetttingsForm } from '@/components';
import {
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  Product,
} from '@/models/products';
import { fetchSiteSettings } from '@/models/settings';
import useRequest from '@ahooksjs/use-request';
import styles from './index.less';

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

  const { data: settings = [], loading: loadingSettings } =
    useRequest(fetchSiteSettings);

  return (
    <div className={styles.wrapper}>
      <Tabs
        defaultValue="products"
        tabPosition="left"
        className={styles.tabs}
        size={'large'}
      >
        <Tabs.TabPane tab="所有商品" key="products">
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
        <Tabs.TabPane
          tab="网站设置"
          key="siteSettings"
          className={styles.siteSettings}
        >
          <SetttingsForm settings={settings} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
