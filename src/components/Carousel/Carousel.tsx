import { fetchCarouselProducts } from '@/models/products';
import useRequest from '@ahooksjs/use-request';
import { Carousel as AntdCarousel } from 'antd';
import styles from './Carousel.less';

interface Product {
  id: number;
  title: string;
  imageUrl: string;
}

export const Carousel = () => {
  const { data, loading } = useRequest(fetchCarouselProducts);
  if (loading) {
    return null;
  }

  const { items } = data;

  return (
    <AntdCarousel className={styles.container}>
      {items.map((item: Product) => (
        <div className={styles.item} key={item.id}>
          <img className={styles.cover} src={item.imageUrl} alt={item.title} />
          <div className={styles.info}>{item.title}</div>
        </div>
      ))}
    </AntdCarousel>
  );
};
