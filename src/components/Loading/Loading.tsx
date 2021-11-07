import { Spin } from 'antd';
import styles from './Loading.less';

export default () => (
  <div className={styles.container}>
    <Spin />
  </div>
);
