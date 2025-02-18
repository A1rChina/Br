import React, { useState, useEffect } from 'react';
import { Layout, Card, Progress, Typography, Row, Col, Statistic, theme } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpOutlined, CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

function App() {
  const [planData, setPlanData] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    const mockData = {
      monthlyPlans: [
        {
          month: "March",
          targetReturn: 24.0,
          targetAmount: 1000.0,
          currentAmount: 30.0,
          currentReturn: 0.0,
          startDate: "2024-03-01",
          endDate: "2024-03-31",
          specialTargets: "需要连续17次操作不失误"
        },
        {
          month: "April",
          targetReturn: 12.0,
          targetAmount: 30000.0,
          currentAmount: 1000.0,
          currentReturn: 0.0,
          startDate: "2024-04-01",
          endDate: "2024-04-30"
        },
        {
          month: "May",
          targetReturn: 6.0,
          targetAmount: 182000.0,
          currentAmount: 30000.0,
          currentReturn: 0.0,
          startDate: "2024-05-01",
          endDate: "2024-05-31"
        }
      ],
      overallGoal: 3000000.0,
      startAmount: 30.0,
      endDate: "2024-09-03"
    };
    setPlanData(mockData);
  }, []);

  if (!planData) return <div>加载中...</div>;

  const calculateProgress = (current, target) => (current / target) * 100;

  return (
    <Layout className="layout" style={{ minHeight: '100vh', background: token.colorBgContainer }}>
      <Header style={{ 
        background: 'transparent', 
        padding: '20px', 
        height: 'auto',
        lineHeight: '1.5',
        marginBottom: '20px'
      }}>
        <Title level={2} style={{ margin: 0 }}>投资进度追踪</Title>
        <Text type="secondary">追踪您的投资目标和进度</Text>
      </Header>
      <Content style={{ padding: '0 50px 50px' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card
              style={{
                background: 'linear-gradient(135deg, #1890ff11 0%, #1890ff05 100%)',
                borderRadius: '16px',
                border: '1px solid #1890ff22'
              }}
            >
              <Title level={3} style={{ marginBottom: '24px' }}>
                <DollarOutlined style={{ marginRight: '8px' }} />
                总体目标
              </Title>
              <Progress
                percent={calculateProgress(planData.startAmount, planData.overallGoal)}
                format={percent => `${planData.startAmount.toLocaleString()} / ${planData.overallGoal.toLocaleString()} USD`}
                strokeColor={{
                  '0%': token.colorPrimary,
                  '100%': token.colorPrimaryActive,
                }}
                strokeWidth={12}
              />
              <Text style={{ display: 'block', marginTop: '16px' }}>
                <CalendarOutlined style={{ marginRight: '8px' }} />
                目标完成日期: {planData.endDate}
              </Text>
            </Card>
          </Col>
          {planData.monthlyPlans.map((plan, index) => (
            <Col span={8} key={index}>
              <Card
                title={`${plan.month} 计划`}
                style={{
                  borderRadius: '16px',
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
                headStyle={{
                  borderBottom: `2px solid ${token.colorPrimaryBorder}`,
                  fontSize: '18px'
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic
                      title="目标收益率"
                      value={plan.targetReturn}
                      suffix="%"
                      prefix={<ArrowUpOutlined />}
                      valueStyle={{ color: token.colorPrimary }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="当前收益率"
                      value={plan.currentReturn}
                      suffix="%"
                      valueStyle={{ color: token.colorSuccess }}
                    />
                  </Col>
                </Row>
                <Progress
                  percent={calculateProgress(plan.currentAmount, plan.targetAmount)}
                  format={percent => `${plan.currentAmount.toLocaleString()} / ${plan.targetAmount.toLocaleString()} USD`}
                  status="active"
                  strokeColor={{
                    from: token.colorPrimary,
                    to: token.colorPrimaryActive,
                  }}
                  style={{ margin: '24px 0' }}
                />
                {plan.specialTargets && (
                  <Text type="secondary" style={{ 
                    display: 'block', 
                    marginTop: '16px',
                    padding: '12px',
                    background: token.colorBgTextHover,
                    borderRadius: '8px'
                  }}>
                    特殊目标: {plan.specialTargets}
                  </Text>
                )}
                <Row style={{ marginTop: '16px' }} gutter={[8, 8]}>
                  <Col span={12}>
                    <Text type="secondary">开始日期:</Text>
                    <Text style={{ marginLeft: '8px' }}>{plan.startDate}</Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">结束日期:</Text>
                    <Text style={{ marginLeft: '8px' }}>{plan.endDate}</Text>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <Col span={24}>
            <Card 
              title="资产增长趋势"
              style={{
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
              headStyle={{
                borderBottom: `2px solid ${token.colorPrimaryBorder}`,
                fontSize: '18px'
              }}
            >
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={planData.monthlyPlans}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="targetAmount" name="目标金额" stroke="#8884d8" />
                <Line type="monotone" dataKey="currentAmount" name="当前金额" stroke="#82ca9d" />
              </LineChart>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;