import { Carousel } from '@/components/Carousel/Carousel';
import { fetchIntro } from '@/models/home';
import useRequest from '@ahooksjs/use-request';
import styles from './home.less';

const Introduction = () => {
  const { data, loading } = useRequest(fetchIntro);

  if (loading) {
    return null;
  }

  const { title, rows } = data;

  return (
    <div className={styles.intro}>
      <div className={styles.title}>{title}</div>
      {rows.map((text: string, index: number) => (
        <div className={styles.row} key={index}>
          {text}
        </div>
      ))}
      <div className={styles.mask}></div>
    </div>
  );
};

export default () => {
  return (
    <div className={styles.homeWrapper}>
      <Introduction />
      <Carousel />
    </div>
  );
};
