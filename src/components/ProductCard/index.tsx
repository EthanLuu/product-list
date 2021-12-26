import { Card } from 'antd';
import { useState } from 'react';
import { Product } from '@/models/products';
import styles from './index.less';

const { Meta } = Card;

export const ProductCard: React.FC<{ product: Product }> = (props) => {
  const { product } = props;
  const { title, imageUrl, brand, price } = product;
  const [hasImage, setHasImage] = useState(!!imageUrl);

  return (
    <Card
      className={styles.container}
      style={
        !hasImage
          ? { justifyContent: 'center', alignItems: 'center' }
          : undefined
      }
      hoverable
      cover={
        hasImage ? (
          <img
            className={styles.cover}
            src={imageUrl}
            onError={() => setHasImage(false)}
          />
        ) : null
      }
    >
      <Meta title={title} description={`￥${price}`} />
      {brand ? <div className={styles.brandBadge}>{brand}</div> : null}
    </Card>
  );
};
