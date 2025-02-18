import React, { useState, useEffect } from 'react';
import { Layout, Card, Progress, Typography, Row, Col, Statistic } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function App() {
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/plans');
        setPlanData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!planData) return <div>加载中...</div>;

  const calculateProgress = (current, target) => (current / target) * 100;

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 20px' }}>
        <Title level={2}>投资进度追踪</Title>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Title level={3}>总体目标</Title>
              <Progress
                percent={calculateProgress(planData.startAmount, planData.overallGoal)}
                format={percent => `${planData.startAmount.toLocaleString()} / ${planData.overallGoal.toLocaleString()} USD`}
              />
              <Text>目标完成日期: {planData.endDate}</Text>
            </Card>
          </Col>
          {planData.monthlyPlans.map((plan, index) => (
            <Col span={8} key={index}>
              <Card title={`${plan.month} 计划`}>
                <Statistic
                  title="目标收益率"
                  value={plan.targetReturn}
                  suffix="%"
                />
                <Statistic
                  title="当前收益率"
                  value={plan.currentReturn}
                  suffix="%"
                  style={{ margin: '20px 0' }}
                />
                <Progress
                  percent={calculateProgress(plan.currentAmount, plan.targetAmount)}
                  format={percent => `${plan.currentAmount.toLocaleString()} / ${plan.targetAmount.toLocaleString()} USD`}
                />
                {plan.specialTargets && (
                  <Text type="secondary" style={{ display: 'block', marginTop: '10px' }}>
                    特殊目标: {plan.specialTargets}
                  </Text>
                )}
                <div style={{ marginTop: '10px' }}>
                  <Text>开始日期: {plan.startDate}</Text>
                  <br />
                  <Text>结束日期: {plan.endDate}</Text>
                </div>
              </Card>
            </Col>
          ))}
          <Col span={24}>
            <Card title="资产增长趋势">
              <LineChart
                width={1200}
                height={300}
                data={planData.monthlyPlans}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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