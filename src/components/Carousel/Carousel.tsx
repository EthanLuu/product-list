import {
  Category,
  fetchCarouselProducts,
  fetchCategories,
  Product,
} from '@/models/products';
import { getMulSearchHref, getSearchHref } from '@/utils/router';
import useRequest from '@ahooksjs/use-request';
import { Carousel as AntdCarousel, Menu } from 'antd';
import { Link } from 'umi';
import styles from './Carousel.less';

const SideMenu = () => {
  const { data, loading } = useRequest(fetchCategories);
  return (
    <Menu className={styles.categoryContainer}>
      {loading
        ? null
        : data?.map((item: Category) => (
            <Menu.SubMenu key={item.id} title={item.name}>
              {item.subCategories?.map((subItem) => (
                <Menu.Item key={subItem.id}>
                  <Link
                    to={`/products${getMulSearchHref([
                      { key: 'category', value: item.name },
                      { key: 'brand', value: subItem.name },
                    ])}`}
                  >
                    {subItem.name}
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
