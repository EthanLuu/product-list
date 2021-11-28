import { Product } from '@/models/products';
import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'umi';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.less';

export const ProductList: React.FC<{ products: Product[] }> = ({
  products,
}) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (!products) return;
    setCurrentProducts(products.slice(0, pageSize));
  }, [products]);

  if (!products) {
    return null;
  }

  const pageSize = 12;

  const handlePageChange = (page: number) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    setCurrentProducts(products.slice(startIndex, endIndex));
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {currentProducts.map((product: Product) => (
          <Link
            to={`/products/detail/${product.id}`}
            key={product.id}
            className={styles.item}
            target={'_blank'}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      <Pagination
        className={styles.pagination}
        defaultCurrent={1}
        total={products.length}
        pageSize={pageSize}
        showSizeChanger={false}
        onChange={handlePageChange}
        showQuickJumper
        hideOnSinglePage
      />
    </div>
  );
};
