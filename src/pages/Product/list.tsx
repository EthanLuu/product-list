import Loading from '@/components/Loading/Loading';
import { ProductList } from '@/components/ProductList/ProductList';
import { fetchAllProducts } from '@/models/products';
import useRequest from '@ahooksjs/use-request';
import styles from './list.less';

export default () => {
  const { data = [], loading } = useRequest(fetchAllProducts);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.listWrapper}>
      <ProductList products={data} />
    </div>
  );
};
