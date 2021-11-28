import { Product } from '@/models/products';
import { Card } from 'antd';
import styles from './ProductCard.less';

const { Meta } = Card;

const Cover = ({ imageUrl }: { imageUrl: string }) => {
  return <img className={styles.cover} src={imageUrl}></img>;
};

export const ProductCard: React.FC<{ product: Product }> = (props) => {
  const { product } = props;

  const { title, imageUrl, brand, price } = product;

  return (
    <Card
      className={styles.container}
      hoverable
      cover={imageUrl ? <Cover imageUrl={imageUrl} /> : null}
    >
      <Meta title={title} description={`${price.toFixed(2)}元`} />
    </Card>
  );
};
