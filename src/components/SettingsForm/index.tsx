import { Form, Input } from 'antd';
import { fetchSiteSetting } from '@/models/settings';
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

  if (loadingNotice || loadingPhone || loadingAddress) {
    return <Loading />;
  }

  return (
    <Form>
      <Form.Item label="公告标题" name="noticeTitle">
        <Input />
      </Form.Item>
      <Form.Item label="公告内容" name="noticeContent">
        <Input />
      </Form.Item>
      <Form.Item label="手机" name="noticeTitle" initialValue={phone}>
        <Input />
      </Form.Item>
      <Form.Item label="地址" name="noticeTitle" initialValue={address}>
        <Input />
      </Form.Item>
    </Form>
  );
};
