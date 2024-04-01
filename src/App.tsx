import React, { useState } from 'react';
import { Button, Input, Typography, message } from 'antd';
import { exportToPDF } from './pdfUtils';

const { Text } = Typography;

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
    <div style={{ padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '16px' }}>席卡批量生成工具</h1>
        <Input.TextArea
          value={names}
          onChange={e => setNames(e.target.value)}
          placeholder="输入名单，名字之间可且仅可由逗号、顿号、斜杠、回车分隔。"
          autoSize={{ minRows: 3 }}
          style={{ marginBottom: '16px', width: '100%' }}
        />
        <div style={{ display: 'flex', marginBottom: '16px' }}>
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
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <Button type="default" onClick={fillRecommendedSize} style={{ width: '100%' }}>
            推荐尺寸
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Button type="primary" onClick={handleExportToPDF} style={{ width: '100%' }}>
            生成PDF
          </Button>
        </div>
        <div style={{ marginTop: '16px' }}>
          <Text type="secondary">指南：</Text>
          <Text>
            <ol>
              <li>仅支持A4纸；</li>
              <li>名单中的名字之间应由逗号、顿号、斜杠或回车分隔；</li>
              <li>设置好席卡纸的宽度、高度（厘米）后点击按钮生成PDF；</li>
              <li>打印PDF前请仔细确认打印的页边距设置；←待完善</li>
              <li>仅支持二至四字中文姓名；←待完善</li>
              <li>不支持华文行楷不含的的生僻字。←待完善</li>
            </ol>
          </Text>
        </div>
        <div style={{ marginTop: '16px' }}>
          <Text type="secondary">声明：</Text>
          <br />
          <Text>
            <ol>
              <li>本工具由FMC开发，任何人可自由使用；</li>
              <li>本工具在法律允许范围内不提供任何保障；</li>
              <li>沪ICP备2024055006号-1</li>
            </ol>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default App;
