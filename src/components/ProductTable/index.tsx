import { Button, message, Modal, Popconfirm, Space, Switch, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { useEffect, useState } from 'react';
import { ProductForm, ProductsContext } from '@/components/ProductForm';
import {
  delProduct,
  editProduct,
  Product,
  ResponseMessage,
} from '@/models/products';

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
  const [product, setProduct] = useState<Product | null>(null);
  const [categoryFilters, setCategoryFilters] = useState<ColumnFilterItem[]>(
    [],
  );
  const [brandFilters, setBrandFilters] = useState<ColumnFilterItem[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const handleDelete = async (id: number) => {
    const response = await delProduct(id);
    const msg = (await response.json())['msg'];
    if (msg === ResponseMessage.success) {
      message.success('删除成功');
      setProducts([...products.filter((item) => item.id !== id)]);
      return true;
    } else {
      message.error(msg);
      return false;
    }
  };

  const handleDeleteAll = async () => {
    const promises: Promise<boolean>[] = [];
    selectedRowKeys.map((key) => {
      promises.push(handleDelete(key));
    });
    Promise.all(promises);
  };

  const handleEdit = (product: Product) => {
    setProduct(product);
  };

  const handleSwitch = async (checked: boolean, product: Product) => {
    const response = await editProduct(
      { ...product, inCarousel: checked },
      product.id,
    );
    const data = await response.json();
    if (data.msg === ResponseMessage.success) {
      message.success('修改成功');
    } else {
      message.success('修改失败');
    }
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
      sorter: (rowA, rowB) => rowA.price - rowB.price,
    },
    {
      title: '图片地址',
      dataIndex: 'imageUrl',
    },
    {
      title: '首页展示',
      key: 'inCarousel',
      render: (_, record) => (
        <Switch
          defaultChecked={record.inCarousel}
          onChange={(checked) => handleSwitch(checked, record)}
        ></Switch>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Popconfirm
            title="确认删除该项商品？"
            onConfirm={() => handleDelete(record.id)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Popconfirm
          title="确认删除所有选中商品？"
          onConfirm={() => handleDeleteAll()}
        >
          <Button type="default" loading={loading}>
            删除选中项
          </Button>
        </Popconfirm>
      </div>
      <Table
        dataSource={products}
        columns={columns}
        rowKey={(item) => item.id}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (keys: any[]) => setSelectedRowKeys(keys),
        }}
        loading={loading}
        pagination={{ position: ['bottomRight'], pageSize: 10 }}
      ></Table>
      <Modal
        title={product?.title}
        visible={!!product}
        onCancel={() => setProduct(null)}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <ProductForm
          product={product}
          setProduct={setProduct}
          products={products}
          setProducts={setProducts}
        />
      </Modal>
    </>
  );
};
