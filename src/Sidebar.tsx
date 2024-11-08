import React, { useState, useEffect } from 'react';
import { Layout, Menu, Grid } from 'antd';
import { ToolOutlined, HomeOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

interface SidebarProps {
  logo?: string; // 可通过props自定义logo的路径
}

const Sidebar: React.FC<SidebarProps> = ({ logo = "/logo.svg" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    setCollapsed(!screens.md);
  }, [screens.md]);

  const menuItems = [
    {
      key: 'tools',
      icon: <ToolOutlined />,
      label: '在线工具集',
      children: [
        {
          key: 'makenamecards',
          label: <a href="https://tool.muchen.fan/makenamecards">席卡生成工具</a>,
        },
        {
          key: 'assemblepdfs',
          label: <a href="https://tool.muchen.fan/assemblepdfs">PDF编排合并工具</a>,
        },
        {
          key: 'fmcai',
          label: <a href="https://fmc.ai/">FMC-AI (非公开)</a>,
        },
      ],
    },
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <a href="https://www.muchen.fan" target="_blank" rel="noopener noreferrer">范牧晨的网站</a>,
    },
  ];

  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
      breakpoint="md"
      collapsedWidth={80}
    >
      <div style={{ 
        padding: '16px',
        textAlign: 'center',
        marginTop: '20px'
      }}>
        <img 
          src={logo}
          alt="Logo"
          style={{
            height: '32px',
            width: 'auto'
          }}
        />
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={['makenamecards']}
        defaultOpenKeys={screens.md ? ['tools'] : []}
        mode="inline"
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar; 