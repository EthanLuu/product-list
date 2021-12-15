import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons';

export const Breadcrumb: React.FC<{
  style?: React.CSSProperties;
  title?: string;
}> = ({ style, title }) => {
  return (
    <AntdBreadcrumb style={style}>
      <AntdBreadcrumb.Item href="/">
        <HomeOutlined />
      </AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item href="/products">
        <AppstoreOutlined />
        <span>商品列表</span>
      </AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>
        <span>{title}</span>
      </AntdBreadcrumb.Item>
    </AntdBreadcrumb>
  );
};
