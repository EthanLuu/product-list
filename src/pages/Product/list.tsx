import { useEffect, useState } from 'react';
import { Filter, Loading, ProductList, SortSolution } from '@/components';
import {
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  filterProductsByBrandAndCategory,
  Product,
} from '@/models/products';
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

  const { data: brands = [], loading: loadingB } = useRequest(fetchBrands);
  const { data: categories = [], loading: loadingC } =
    useRequest(fetchCategories);
  const [sort, setSort] = useState<SortSolution>(SortSolution.default);

  useEffect(() => {
    setProducts(filterProductsByBrandAndCategory(data, brand, category));
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

  if (
    loading ||
    category === undefined ||
    brand === undefined ||
    loadingB ||
    loadingC
  ) {
    return <Loading />;
  }

  return (
    <div className={styles.listWrapper}>
      <Filter
        category={category}
        categories={categories}
        brand={brand}
        brands={brands}
        setCategory={setCategory}
        setBrand={setBrand}
        sort={sort}
        setSort={setSort}
      />
      <ProductList products={products} />
    </div>
  );
};
