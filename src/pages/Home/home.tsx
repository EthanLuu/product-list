import { Carousel, Loading, Notice, ShopInfo, SideMenu } from '@/components';
import { fetchCarouselProducts, fetchCategoryMap } from '@/models/products';
import { fetchSiteSettings, SiteSetting } from '@/models/settings';
import useRequest from '@ahooksjs/use-request';
import styles from './home.less';

export default () => {
  const { data: settings = [], loading: loadingSettings } =
    useRequest(fetchSiteSettings);
  const { data: categoryMap, loading: loadingMap } =
    useRequest(fetchCategoryMap);

  const { data: carouselProducts = [], loading: loadingCarousel } = useRequest(
    fetchCarouselProducts,
  );

  if (loadingMap || loadingCarousel || loadingSettings) {
    return <Loading />;
  }

  return (
    <div className={styles.homeWrapper}>
      <Notice
        notice={settings.find((x: SiteSetting) => x.key === 'notice')?.value}
      />
      <div className={styles.carouselWrapper}>
        <SideMenu categoryMap={categoryMap} />
        <Carousel carouselProducts={carouselProducts} />
      </div>
      <ShopInfo
        settings={settings.filter((x: SiteSetting) => x.key !== 'notice')}
      />
    </div>
  );
};
