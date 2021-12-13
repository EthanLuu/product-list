import {
  addProduct,
  delProduct,
  Product,
  ResponseMessage,
} from '@/models/products';
import {
  Space,
  Table,
  Form,
  Input,
  Button,
  Popconfirm,
  message,
  InputNumber,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface ProductsContext {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  loading?: boolean;
}

export const ProductTable = (props: ProductsContext) => {
  const { products, setProducts, loading = false } = props;

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
  );
};

export const ProductForm = (props: ProductsContext) => {
  const { products, setProducts } = props;
  const handleSubmit = async (body: any) => {
    const response = await addProduct(body);
    const data = await response.json();
    if (data.msg === ResponseMessage.success) {
      setProducts([...products, JSON.parse(data.item)]);
      message.success('添加成功');
    } else {
      message.error(data.msg);
    }
  };
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ width: '80%', margin: 'auto' }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="名称"
        name="title"
        rules={[{ required: true, message: '请输入商品名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="类别"
        name="category"
        rules={[{ required: true, message: '请输入商品类别' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="品牌" name="brand">
        <Input />
      </Form.Item>
      <Form.Item label="价格" name="price" rules={[{ type: 'number' }]}>
        <InputNumber step="1.00" />
      </Form.Item>
      <Form.Item label="图片地址" name="imageUrl">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          添加
        </Button>
      </Form.Item>
    </Form>
  );
};
