import { ProductList } from '@/components/ProductList/ProductList';
import styles from './list.less';

export default () => {
  return (
    <div className={styles.listWrapper}>
      <ProductList />
    </div>
  );
};
