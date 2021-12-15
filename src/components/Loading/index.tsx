import { Spin } from 'antd';
import styles from './index.less';

export const Loading = () => (
  <div className={styles.container}>
    <Spin />
  </div>
);
