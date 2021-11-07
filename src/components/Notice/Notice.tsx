import { fetchNotice } from '@/models/home';
import useRequest from '@ahooksjs/use-request';
import styles from './Notice.less';

export const Notice = () => {
  const { data, loading } = useRequest(fetchNotice);

  if (loading || !data) {
    return null;
  }

  const { title, rows } = data;

  return (
    <div className={styles.container}>
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
