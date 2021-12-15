import { Descriptions, Image } from 'antd';
import { useParams } from 'react-router';
import { Breadcrumb, Loading } from '@/components';
import { fetchOneProduct } from '@/models/products';
import useRequest from '@ahooksjs/use-request';
import styles from './detail.less';

export default () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, loading } = useRequest(() =>
    fetchOneProduct(parseInt(id)),
  );

  if (loading || !product) {
    return <Loading />;
  }

  if (typeof product === 'string') {
    return <div>404</div>;
  }

  return (
    <div className={styles.wrapper}>
      <Breadcrumb style={{ marginBottom: '12px' }} title={product?.title} />
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <Image
            src={product?.imageUrl}
            height="100%"
            width="100%"
            style={{ objectFit: 'cover' }}
            alt={product?.title}
          ></Image>
        </div>
        <div className={styles.rightColumn}>
          <Descriptions title={product?.title} column={1}>
            <Descriptions.Item label="名称">{product?.title}</Descriptions.Item>
            <Descriptions.Item label="类别">
              {product?.category}
            </Descriptions.Item>
            <Descriptions.Item label="品牌">{product?.brand}</Descriptions.Item>
            <Descriptions.Item label="价格">
              {product?.price.toFixed(2)}元
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </div>
  );
};
