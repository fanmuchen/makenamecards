import React, { useState, useEffect } from 'react';
import { Button, Input, Typography, message, Layout, Form, Divider, Checkbox, Spin, Select, Menu, Grid } from 'antd';
import { exportToPDF } from './pdfUtils';
import ToolkitSidebar from 'fmcnav'; 

const { Text } = Typography;
const { Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const [names, setNames] = useState<string>('');
  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    setCollapsed(!screens.md);
  }, [screens.md]);

  const handleExportToPDF = async () => {
    if (!names) {
      message.error('请先输入名单');
      return;
    }

    if (!width || !height || width > 21 || height > 29.7) {
      message.error('请先输入正确的席卡纸尺寸');
      return;
    }

    setLoading(true);
    try {
      await exportToPDF(names, width, height);
    } catch (error) {
      message.error('生成PDF时出错');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fillRecommendedSize = () => {
    setWidth(17.01); // Recommended width in cm
    setHeight(17.96); // Recommended height in cm
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <ToolkitSidebar 
          logo={`${process.env.PUBLIC_URL || ""}/logo.svg`}
          selectedKeys={['makenamecards']}
        />
      <Layout>
        <Spin spinning={loading} tip="正在加载字体资源... (18.4 MB)" size="large">
          <Content
            style={{
              padding: screens.md ? '24px 24px' : '12px',
              maxWidth: 800,
              margin: '0 auto',
              width: '100%',
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


              <Form layout="vertical">
                <Form.Item label="输入名单">
                  <Input.TextArea
                    value={names}
                    onChange={e => setNames(e.target.value)}
                    placeholder="输入名单，名字之间可且仅可由逗号、顿号、斜杠、回车分隔。"
                    autoSize={{ minRows: 3 }}
                  />
                </Form.Item>
                <Form.Item label="席卡尺寸">
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
                  <Button 
                    type="primary" 
                    onClick={handleExportToPDF} 
                    style={{ width: '100%' }}
                    loading={loading}
                  >
                    生成PDF
                  </Button>
                  <div style={{ marginTop: '16px' }}>
                  <Text type="secondary">说明：</Text>
                  <Text>
                    <ol>
                      <li>目前仅支持A4纸，仅支持二至四字中文姓名；</li>
                      <li>名单中的名字之间应由逗号、顿号、斜杠或回车分隔；</li>
                      <li>生成的PDF付印时需注意不要添加页边距和页面缩放；
                        {/* <br />
                        <Text type="danger" style={{ lineHeight: 1 }}>
                          涉密pdf查看器：打印→页面处理→页面缩放，选择“无”；
                        </Text> */}
                      </li>
                      <li>本工具离线运行，不采集任何用户信息。</li>
                    </ol>
                  </Text>
                </div>
                <Text type="secondary">图示：<br/></Text>
                <div style={{ textAlign: 'center'}}>
                <img 
                  src={`${process.env.PUBLIC_URL}/illustrator.svg`} 
                  alt="Illustrator" 
                  style={{ maxWidth: '600px' }}
                />
              </div>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Spin>
        <Footer style={{ textAlign: 'center' }}>
        Muchen Fan ©{new Date().getFullYear()} Created by FMC
          <br /><br />
          沪ICP备2024055006号-1
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
