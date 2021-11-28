import styles from './ShopInfo.less';
import { Descriptions } from 'antd';

export const ShopInfo = () => {
  return (
    <div className={styles.container}>
      <Descriptions title="店铺信息" column={1} className={styles.info}>
        <Descriptions.Item label="联系电话">1810000000</Descriptions.Item>
        <Descriptions.Item label="地址">
          张家港市杨舍镇梁丰五金机电城嘉瑞商业广场2M-130
        </Descriptions.Item>
      </Descriptions>
      <div className={styles.locationInfo}>
        <a
          href="https://map.baidu.com/search/%E5%BC%A0%E5%AE%B6%E6%B8%AF%E5%B8%82%E6%9D%A8%E8%88%8D%E9%95%87%E6%A2%81%E4%B8%B0%E4%BA%94%E9%87%91%E6%9C%BA%E7%94%B5%E5%9F%8E%E5%98%89%E7%91%9E%E5%95%86%E4%B8%9A%E5%B9%BF%E5%9C%BA2m-130/@13421355.89308908,3722848.1250000005,14.96z?querytype=s&da_src=shareurl&wd=%E5%BC%A0%E5%AE%B6%E6%B8%AF%E5%B8%82%E6%9D%A8%E8%88%8D%E9%95%87%E6%A2%81%E4%B8%B0%E4%BA%94%E9%87%91%E6%9C%BA%E7%94%B5%E5%9F%8E%E5%98%89%E7%91%9E%E5%95%86%E4%B8%9A%E5%B9%BF%E5%9C%BA2m-130&c=224&src=0&pn=0&sug=0&l=12&b=(13382061.72864778,3706612.748805036;13440665.970157214,3739007.8711949727)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styles.map}
            src="https://cdn.ethanloo.cn/img/202111281358048.png"
            alt="map"
          />
        </a>
      </div>
    </div>
  );
};
