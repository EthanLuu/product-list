import { Carousel, Loading, Notice, ShopInfo, SideMenu } from '@/components';
import { fetchCarouselProducts, fetchCategoryMap } from '@/models/products';
import { fetchSiteSetting } from '@/models/settings';
import useRequest from '@ahooksjs/use-request';
import styles from './home.less';

export default () => {
  const { data: notice, loading: loadingNotice } = useRequest(() =>
    fetchSiteSetting('notice'),
  );
  const { data: phone, loading: loadingPhone } = useRequest(() =>
    fetchSiteSetting('phone'),
  );
  const { data: address, loading: loadingAddress } = useRequest(() =>
    fetchSiteSetting('address'),
  );
  const { data: categoryMap, loading: loadingMap } =
    useRequest(fetchCategoryMap);

  const { data: carouselProducts = [], loading: loadingCarousel } = useRequest(
    fetchCarouselProducts,
  );

  if (
    loadingNotice ||
    loadingMap ||
    loadingCarousel ||
    loadingPhone ||
    loadingAddress
  ) {
    return <Loading />;
  }

  return (
    <div className={styles.homeWrapper}>
      <Notice notice={notice} />
      <div className={styles.carouselWrapper}>
        <SideMenu categoryMap={categoryMap} />
        <Carousel carouselProducts={carouselProducts} />
      </div>
      <ShopInfo phone={phone} address={address} />
    </div>
  );
};
