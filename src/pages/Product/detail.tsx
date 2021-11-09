import Loading from '@/components/Loading/Loading';
import { fetchAllProducts } from '@/models/products';
import useRequest from '@ahooksjs/use-request';
import { useParams } from 'react-router';
import styles from '@/pages/Product/detail.less';
import { Descriptions, Image } from 'antd';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';

export default () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useRequest(fetchAllProducts);
  if (loading) {
    return <Loading />;
  }
  const product = data?.find((product) => product.id === Number.parseInt(id));

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
          <Descriptions title={product?.title} bordered column={1}>
            <Descriptions.Item label="名称">{product?.title}</Descriptions.Item>
            <Descriptions.Item label="品牌">{product?.brand}</Descriptions.Item>
            <Descriptions.Item label="价格">{product?.price}</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </div>
  );
};
