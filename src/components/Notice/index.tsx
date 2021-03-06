import styles from './index.less';

export const Notice: React.FC<{ notice: string | undefined }> = ({
  notice,
}) => {
  if (!notice) {
    return null;
  }
  try {
    const data = JSON.parse(notice);
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
  } catch (error) {
    return null;
  }
};
