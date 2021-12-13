import {
  fetchCarouselProducts,
  fetchCategoryMap,
  Product,
} from '@/models/products';
import { getMulSearchHref } from '@/utils/router';
import useRequest from '@ahooksjs/use-request';
import { Carousel as AntdCarousel, Menu } from 'antd';
import { Link } from 'umi';
import styles from './Carousel.less';

const SideMenu = () => {
  const { data, loading } = useRequest(fetchCategoryMap);
  return (
    <Menu className={styles.categoryContainer}>
      {loading
        ? null
        : data?.map((item: any, index: number) => (
            <Menu.SubMenu key={index} title={item[0]}>
              {item[1]?.map((brand: string, index: number) => (
                <Menu.Item key={index}>
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

export const Carousel = () => {
  const { data, loading } = useRequest(fetchCarouselProducts);

  return (
    <div className={styles.wrapper}>
      {loading ? null : (
        <>
          <SideMenu />
          <AntdCarousel className={styles.carouselContainer} autoplay>
            {data?.map((item: Product) => (
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
        </>
      )}
    </div>
  );
};
