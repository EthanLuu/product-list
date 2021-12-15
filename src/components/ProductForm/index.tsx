import { Button, Form, Input, InputNumber, message } from 'antd';
import { useEffect } from 'react';
import {
  addProduct,
  editProduct,
  Product,
  ResponseMessage,
} from '@/models/products';

export interface ProductsContext {
  products?: Product[];
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
  loading?: boolean;
  product?: Product | null;
  setProduct?: React.Dispatch<React.SetStateAction<Product | null>>;
}

export const ProductForm = (props: ProductsContext) => {
  const {
    products = [],
    setProducts = () => {},
    product,
    setProduct = () => {},
  } = props;
  const [form] = Form.useForm();

  const handleSubmit = async (body: any) => {
    if (product) {
      // edit
      const response = await editProduct(body, product.id);
      const data = await response.json();
      if (data.msg === ResponseMessage.success) {
        const oldProduct: any = products.find((item) => item.id === product.id);
        const newProduct = { ...body };
        for (let key of Object.keys(newProduct)) {
          oldProduct[key] = newProduct[key];
        }
        setProducts([...products]);
        setProduct(null);
        message.success('修改成功');
      } else {
        message.error(data.msg);
      }
    } else {
      // add
      const response = await addProduct(body);
      const data = await response.json();
      if (data.msg === ResponseMessage.success) {
        setProducts([...products, JSON.parse(data.item)]);
        message.success('添加成功');
      } else {
        message.error(data.msg);
      }
    }
  };

  useEffect(() => {
    form.setFieldsValue({ ...product });
  }, [product]);

  return (
    <Form
      labelCol={{ span: 4 }}
      style={{ margin: 'auto' }}
      onFinish={handleSubmit}
      onReset={() => {
        setProduct(null);
      }}
      form={form}
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
        <Button type="primary" htmlType="submit">
          {product ? '确定' : '添加'}
        </Button>
        <Button htmlType="reset" style={{ marginLeft: 12 }}>
          {product ? '取消' : '重置'}
        </Button>
      </Form.Item>
    </Form>
  );
};
