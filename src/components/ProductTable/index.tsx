import { message, Modal, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { useEffect, useState } from 'react';
import { ProductForm, ProductsContext } from '@/components/ProductForm';
import { delProduct, Product, ResponseMessage } from '@/models/products';

export const ProductTable = (
  props: ProductsContext & { categories: string[]; brands: string[] },
) => {
  const {
    products = [],
    setProducts = () => {},
    loading = false,
    categories,
    brands,
  } = props;
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [categoryFilters, setCategoryFilters] = useState<ColumnFilterItem[]>(
    [],
  );
  const [brandFilters, setBrandFilters] = useState<ColumnFilterItem[]>([]);

  const handleDelete = async (product: Product) => {
    const response = await delProduct(product.id);
    const msg = (await response.json())['msg'];
    if (msg === ResponseMessage.success) {
      message.success('删除成功');
      setProducts([...products.filter((item) => item.id !== product.id)]);
    } else {
      message.error(msg);
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
  };

  useEffect(() => {
    const filters: ColumnFilterItem[] = [];
    categories.map((c) => {
      filters.push({ text: c, value: c });
    });
    setCategoryFilters(filters);
  }, [categories]);

  useEffect(() => {
    const filters: ColumnFilterItem[] = [];
    brands.map((c) => {
      filters.push({ text: c, value: c });
    });
    setBrandFilters(filters);
  }, [brands]);

  const columns: ColumnsType<Product> = [
    {
      title: '商品名称',
      dataIndex: 'title',
    },
    {
      title: '类别',
      dataIndex: 'category',
      filters: categoryFilters,
      onFilter: (value, record) => record.category === value,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      filters: brandFilters,
      onFilter: (value, record) => record.brand === value,
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
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Popconfirm
            title="确认删除该项商品？"
            onConfirm={() => handleDelete(record)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={products}
        columns={columns}
        rowKey={(item) => item.id}
        rowSelection={{
          type: 'checkbox',
        }}
        loading={loading}
        pagination={{ position: ['bottomRight'], pageSize: 10 }}
      ></Table>
      <Modal
        title={editProduct?.title}
        visible={!!editProduct}
        onCancel={() => setEditProduct(null)}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <ProductForm
          product={editProduct}
          setProduct={setEditProduct}
          products={products}
          setProducts={setProducts}
        />
      </Modal>
    </>
  );
};
