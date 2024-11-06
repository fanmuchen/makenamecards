import React, { useState } from 'react';
import { Button, Input, Typography, message, Layout, Form, Divider, Checkbox, Spin, Select } from 'antd';
import { exportToPDF } from './pdfUtils';
import { InboxOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Content, Footer } = Layout;

const App: React.FC = () => {
  const [names, setNames] = useState<string>('');
  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();

  const handleExportToPDF = () => {
    if (!names) {
      message.error('请先输入名单');
      return;
    }

    if (!width || !height || width > 21 || height > 29.7) {
      message.error('请先输入正确的席卡纸尺寸');
      return;
    }

    exportToPDF(names, width, height); // Call the function from pdfUtils.ts
  };

  const fillRecommendedSize = () => {
    setWidth(17.01); // Recommended width in cm
    setHeight(17.96); // Recommended height in cm
  };

  return (
    <Layout>
      <Content
        style={{
          padding: '24px 24px',
          maxWidth: 800,
          margin: '0 auto',
          width: '100%',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        <div
          style={{
            padding: 24,
            background: '#ffffff',
            margin: '0 auto',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>席卡批量生成工具</h2>
          <div style={{ marginTop: '16px' }}>
              <Text type="secondary">说明：</Text>
              <Text>
                <ol>
                  <li>仅支持A4纸；</li>
                  <li>名单中的名字之间应由逗号、顿号、斜杠或回车分隔；</li>
                  <li>目前仅支持二至四字中文姓名，输入其他字符格式会乱；</li>
                  <li>设置好席卡纸的宽度、高度（厘米）后点击按钮生成PDF；</li>
                  <li>打印PDF前请仔细确认打印的页边距设置；<br />
                    <Text type="danger" style={{ lineHeight: 1 }}>
                      涉密pdf查看器：打印→页面处理→页面缩放，选择“无”；
                    </Text>
                  </li>
                  <li>不支持华文行楷不含的的生僻字。←待完善</li>
                </ol>
              </Text>
            </div>
          <Form layout="vertical">
            <Form.Item label="输入名单">
              <Input.TextArea
                value={names}
                onChange={e => setNames(e.target.value)}
                placeholder="输入名单，名字之间可且仅可由逗号、顿号、斜杠、回车分隔。"
                autoSize={{ minRows: 3 }}
              />
            </Form.Item>
            <Form.Item label="纸张尺寸">
              <div style={{ display: 'flex' }}>
                <Input
                  type="number"
                  value={width}
                  onChange={e => setWidth(parseFloat(e.target.value))}
                  placeholder="宽度 (cm)"
                  style={{ marginRight: '8px', width: '50%' }}
                />
                <Input
                  type="number"
                  value={height}
                  onChange={e => setHeight(parseFloat(e.target.value))}
                  placeholder="高度 (cm)"
                  style={{ width: '50%' }}
                />
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="default" onClick={fillRecommendedSize} style={{ width: '100%' }}>
                推荐尺寸
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleExportToPDF} style={{ width: '100%' }}>
                生成PDF
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
      Muchen Fan ©{new Date().getFullYear()} Created by FMC
        <br /><br />
        沪ICP备2024055006号-1
      </Footer>
    </Layout>
  );
};

export default App;
