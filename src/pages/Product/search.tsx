import Loading from '@/components/Loading/Loading';
import { ProductList } from '@/components/ProductList/ProductList';
import { fetchAllProducts } from '@/models/products';
import { useSearchParams } from '@/utils/router';
import useRequest from '@ahooksjs/use-request';
import styles from './list.less';

export default () => {
  const params = useSearchParams();
  const key = params.get('key') || '';
  const { data, loading } = useRequest(fetchAllProducts);

  if (loading) {
    return <Loading />;
  }

  const products =
    data?.filter((product) => {
      return (
        product.brand?.includes(key) ||
        product.category?.includes(key) ||
        product.title?.includes(key)
      );
    }) || [];

  return (
    <div className={styles.listWrapper}>
      <h2 className={styles.searchTitle}>{`搜索关键词：${key}`}</h2>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <h2 className={styles.searchTitle}>暂无结果</h2>
      )}
    </div>
  );
};
