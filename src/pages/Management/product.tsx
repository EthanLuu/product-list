import { fetchAllProducts, Product } from '@/models/products';
import useRequest from '@ahooksjs/use-request';
import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export const ProductTable = () => {
  const { data: products, loading } = useRequest(fetchAllProducts);
  const columns: ColumnsType<Product> = [
    {
      title: '商品名称',
      dataIndex: 'title',
    },
    {
      title: '类别',
      dataIndex: 'category',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '图片地址',
      dataIndex: 'imageUrl',
    },
    {
      title: '操作',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  return (
    <Table
      dataSource={products}
      columns={columns}
      rowKey={(item) => item.id}
      loading={loading}
      rowSelection={{
        type: 'checkbox',
      }}
      pagination={{ position: ['bottomRight'], pageSize: 10 }}
    ></Table>
  );
};
