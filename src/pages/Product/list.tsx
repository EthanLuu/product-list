import { useEffect, useState } from 'react';
import { Filter, Loading, ProductList, SortSolution } from '@/components';
import { fetchAllProducts, filterProducts, Product } from '@/models/products';
import { useSearchParams } from '@/utils/router';
import useRequest from '@ahooksjs/use-request';
import styles from './list.less';

export default () => {
  const { data = [], loading } = useRequest(fetchAllProducts);
  const params = useSearchParams();
  const [category, setCategory] = useState<string | null>(
    params.get('category'),
  );
  const [brand, setBrand] = useState<string | null>(params.get('brand'));
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<SortSolution>(SortSolution.default);

  useEffect(() => {
    setProducts(filterProducts(data, '', category, brand));
  }, [loading, category, brand]);

  useEffect(() => {
    let p: Product[];
    if (sort == SortSolution.asc) {
      p = products.sort((a, b) => a.price - b.price);
    } else if (sort === SortSolution.desc) {
      p = products.sort((a, b) => b.price - a.price);
    } else {
      p = products.sort((a, b) => a.id - b.id);
    }
    setProducts([...p]);
  }, [sort]);

  if (loading || category === undefined || brand === undefined) {
    return <Loading />;
  }

  return (
    <div className={styles.listWrapper}>
      <Filter
        category={category}
        brand={brand}
        setCategory={setCategory}
        setBrand={setBrand}
        sort={sort}
        setSort={setSort}
      />
      <ProductList products={products} />
    </div>
  );
};
