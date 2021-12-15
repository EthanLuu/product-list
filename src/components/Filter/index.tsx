import { Link } from 'react-router-dom';
import { fetchBrands, fetchCategories } from '@/models/products';
import { getSearchHref } from '@/utils/router';
import useRequest from '@ahooksjs/use-request';
import { Loading } from '../Loading';
import styles from './index.less';

export enum SortSolution {
  default = 'default',
  desc = 'desc',
  asc = 'asc',
}

export const Filter: React.FC<{
  category: string | null;
  brand: string | null;
  sort: SortSolution;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setBrand: React.Dispatch<React.SetStateAction<string | null>>;
  setSort: React.Dispatch<React.SetStateAction<SortSolution>>;
}> = ({ category, brand, sort, setCategory, setBrand, setSort }) => {
  const { data: categories, loading: loadingC } = useRequest(fetchCategories);
  const { data: brands, loading: loadingB } = useRequest(fetchBrands);

  if (loadingB || loadingC) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.rowTitle}>类别：</div>
        <Link
          to={getSearchHref('category', null)}
          className={`${styles.item} ${!category ? styles.selected : ''}`}
          onClick={() => setCategory(null)}
        >
          全部
        </Link>
        {categories?.map((c, idx) => (
          <Link
            to={getSearchHref('category', c)}
            className={`${styles.item} ${
              category === c ? styles.selected : ''
            }`}
            key={idx}
            onClick={() => setCategory(c)}
          >
            {c}
          </Link>
        ))}
      </div>
      <div className={styles.row}>
        <div className={styles.rowTitle}>品牌：</div>
        <Link
          to={getSearchHref('brand', null)}
          className={`${styles.item} ${!brand ? styles.selected : ''}`}
          onClick={() => setBrand(null)}
        >
          全部
        </Link>
        {brands?.map((c, idx) => (
          <Link
            to={getSearchHref('brand', c)}
            className={`${styles.item} ${brand === c ? styles.selected : ''}`}
            key={idx}
            onClick={() => setBrand(c)}
          >
            {c}
          </Link>
        ))}
      </div>
      <div className={styles.row}>
        <div className={styles.rowTitle}>价格排序：</div>
        <div
          className={`${styles.item} ${
            sort === SortSolution.default ? styles.selected : ''
          }`}
          onClick={() => setSort(SortSolution.default)}
        >
          默认
        </div>
        <div
          className={`${styles.item} ${
            sort === SortSolution.asc ? styles.selected : ''
          }`}
          onClick={() => setSort(SortSolution.asc)}
        >
          升序
        </div>
        <div
          className={`${styles.item} ${
            sort === SortSolution.desc ? styles.selected : ''
          }`}
          onClick={() => setSort(SortSolution.desc)}
        >
          降序
        </div>
      </div>
    </div>
  );
};
