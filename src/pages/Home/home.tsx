import { Carousel } from '@/components/Carousel/Carousel';
import { Notice } from '@/components/Notice/Notice';
import styles from './home.less';

export default () => {
  return (
    <div className={styles.homeWrapper}>
      <Notice />
      <Carousel />
    </div>
  );
};
