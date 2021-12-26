import { Button, Form, Input, message } from 'antd';
import { ResponseMessage } from '@/models/products';
import { SiteSetting, updateSiteSettings } from '@/models/settings';

export const SetttingsForm: React.FC<{ settings: SiteSetting[] }> = ({
  settings,
}) => {
  const notice = settings.find((setting) => setting.key === 'notice')?.value;

  const parseNotice = (notice = '') => {
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
    body.notice = notice;
    settings.map((x) => (x.value = body[x.key]));
    const response = await updateSiteSettings(settings);
    if (response.msg === ResponseMessage.success) {
      message.success('修改成功');
    } else {
      message.error(response.msg);
    }
  };

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
      {settings
        .filter((x) => x.key !== 'notice')
        .map((x) => (
          <Form.Item
            label={x.name}
            name={x.key}
            initialValue={x.value}
            key={x.key}
          >
            <Input />
          </Form.Item>
        ))}
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
