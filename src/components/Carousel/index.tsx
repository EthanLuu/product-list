import { Carousel as AntdCarousel, Menu } from 'antd';
import { Link } from 'umi';
import { fetchCategoryMap, Product } from '@/models/products';
import { getMulSearchHref } from '@/utils/router';
import useRequest from '@ahooksjs/use-request';
import styles from './index.less';

export const SideMenu: React.FC<{ categoryMap: any }> = ({ categoryMap }) => {
  const { data, loading } = useRequest(fetchCategoryMap);
  return (
    <Menu className={styles.categoryContainer}>
      {loading
        ? null
        : data?.map((item: any, cIdx: number) => (
            <Menu.SubMenu key={cIdx} title={item[0]}>
              {item[1]?.map((brand: string, bIdx: number) => (
                <Menu.Item key={`${cIdx}-${bIdx}`}>
                  <Link
                    to={`/products${getMulSearchHref([
                      { key: 'category', value: item[0] },
                      { key: 'brand', value: brand },
                    ])}`}
                  >
                    {brand}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
    </Menu>
  );
};

export const Carousel: React.FC<{ carouselProducts: Product[] }> = ({
  carouselProducts,
}) => {
  return (
    <AntdCarousel className={styles.carouselContainer} autoplay>
      {carouselProducts?.map((item) => (
        <div className={styles.item} key={item.id}>
          <Link to={`/products/detail/${item.id}`}>
            <img
              className={styles.cover}
              src={item.imageUrl}
              alt={item.title}
            />
          </Link>
          <div className={styles.title}>{item.title}</div>
        </div>
      ))}
    </AntdCarousel>
  );
};
