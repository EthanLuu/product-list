import { Button, Form, Input, message } from 'antd';
import { ResponseMessage } from '@/models/products';
import { fetchSiteSetting, updateSiteSetting } from '@/models/settings';
import useRequest from '@ahooksjs/use-request';
import { Loading } from '../Loading';

export const SetttingsForm = () => {
  const { data: notice, loading: loadingNotice } = useRequest(() =>
    fetchSiteSetting('notice'),
  );
  const { data: phone, loading: loadingPhone } = useRequest(() =>
    fetchSiteSetting('phone'),
  );
  const { data: address, loading: loadingAddress } = useRequest(() =>
    fetchSiteSetting('address'),
  );

  const parseNotice = (notice: string) => {
    const obj = JSON.parse(notice);
    let rows = '';
    for (let row of obj.rows) {
      rows += `${row}\n`;
    }
    return {
      title: obj.title,
      rows,
    };
  };

  const stringfyNotice = (title: string, rows: string) => {
    const notice = {
      title,
      rows: rows.split('\n'),
    };
    return JSON.stringify(notice);
  };

  const handleSubmit = async (body: any) => {
    const notice = stringfyNotice(body.noticeTitle, body.noticeContent);
    const phone = body.phone;
    const address = body.address;
    const responseA = await updateSiteSetting('notice', notice);
    const responseB = await updateSiteSetting('phone', phone);
    const responseC = await updateSiteSetting('address', address);
    if (
      [responseA, responseB, responseC].every(
        (r) => (r.msg = ResponseMessage.success),
      )
    ) {
      message.success('修改成功');
    } else {
      message.error([responseA.msg, responseB.msg, responseC.msg]);
    }
  };

  if (loadingNotice || loadingPhone || loadingAddress) {
    return <Loading />;
  }

  return (
    <Form
      labelCol={{ span: 4 }}
      style={{ margin: 'auto' }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="公告标题"
        name="noticeTitle"
        initialValue={parseNotice(notice).title}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="公告内容"
        name="noticeContent"
        initialValue={parseNotice(notice).rows}
      >
        <Input.TextArea autoSize />
      </Form.Item>
      <Form.Item label="手机" name="phone" initialValue={phone}>
        <Input />
      </Form.Item>
      <Form.Item label="地址" name="address" initialValue={address}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {'确定'}
        </Button>
        <Button htmlType="reset" style={{ marginLeft: 12 }}>
          {'重置'}
        </Button>
      </Form.Item>
    </Form>
  );
};
