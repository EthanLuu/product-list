import { fetchCarouselProducts, fetchCategories } from '@/models/products';
import useRequest from '@ahooksjs/use-request';
import { Carousel as AntdCarousel, Menu } from 'antd';
import { Link } from 'umi';
import styles from './Carousel.less';

interface Product {
  id: number;
  title: string;
  imageUrl: string;
}

interface Category {
  id: number;
  name: string;
  subCategories?: Category[];
}

const SideMenu = () => {
  const { data, loading } = useRequest(fetchCategories);
  if (loading) {
    return null;
  }
  const { items } = data;
  return (
    <Menu className={styles.categoryContainer}>
      {items.map((item: Category) => (
        <Menu.SubMenu key={item.id} title={item.name}>
          {item.subCategories?.map((subItem) => (
            <Menu.Item key={subItem.id}>
              <Link to={`/products?s=${subItem.name}`}>{subItem.name}</Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
};

export const Carousel = () => {
  const { data: carouselData, loading } = useRequest(fetchCarouselProducts);

  if (loading) {
    return null;
  }
  const { items: carouselItems } = carouselData;

  return (
    <div className={styles.wrapper}>
      <SideMenu />
      <AntdCarousel className={styles.carouselContainer}>
        {carouselItems.map((item: Product) => (
          <div className={styles.item} key={item.id}>
            <img
              className={styles.cover}
              src={item.imageUrl}
              alt={item.title}
            />
            <div className={styles.title}>{item.title}</div>
          </div>
        ))}
      </AntdCarousel>
    </div>
  );
};
