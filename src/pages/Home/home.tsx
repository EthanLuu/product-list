import { Carousel } from '@/components/Carousel/Carousel';
import { Notice } from '@/components/Notice/Notice';
import { ShopInfo } from '@/components/ShopInfo/ShopInfo';
import styles from './home.less';

export default () => {
  return (
    <div className={styles.homeWrapper}>
      <Notice />
      <Carousel />
      <ShopInfo />
    </div>
  );
};
