import { Card, Col, Divider, notification, Row } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import { GetDashboardDetails } from "../../apis/dashboard";
import DateSelector from "../../components/DateSelector";
import DoubleBarChart from "../../components/dashbboard/DoubleBarGraph";
import CumulativeExpenseLineChart from "../../components/dashbboard/CumulativeExpenseDoubleLineGraph";
import LineGraph from "../../components/dashbboard/LineGraph";

const DashboardPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [stats, setStats] = useState<{ title: string; value: number }[]>([]);
  const [doubleGraphData, setDoubleGraphData] = useState<
    { category: string; Budget: number; Expense: number }[]
  >([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [dailyExpenseData, setDailyExpenseData] = useState<
    { date: string; amount: number }[]
  >([]);
  const [dailySavingsData, setDailySavingsData] = useState<
    { date: string; amount: number }[]
  >([]);

  //get all dashboard stats
  useEffect(() => {
    (async () => {
      try {
        const response = await GetDashboardDetails(
          currentDate.getMonth(),
          currentDate.getFullYear()
        );

        setStats(response.data.data.stats);
        setDoubleGraphData(response.data.data.doubleBarGraphData);
        setTotalBudget(response.data.data.totalBudget);
        setDailyExpenseData(response.data.data.dailyExpenseData);
        setDailySavingsData(response.data.data.dailySavingsData);
      } catch (err: any) {
        if (err?.response?.data?.userMessage && err?.response.staus !== 500) {
          notification.error({
            message: "Error",
            description: err?.response?.data?.userMessage,
          });
        } else {
          notification.error({
            message: "Error",
            description: "Failed to fetch data",
          });
        }
      }
    })();
  }, [currentDate]);
  return (
    <div className="page-container">
      <div className="header-container">
        <h1 className="page_hd">Dashboard</h1>
      </div>

      {/* Month selector */}
      <DateSelector currentDate={currentDate} setCurrentDate={setCurrentDate} />

      {/* Quick Stats */}
      <div className="stats-container">
        <Row gutter={[16, 16]} className="stat-row">
          {stats.map((stat) => (
            <Col key={stat.title} xs={12} sm={8} md={6} lg={4}>
              <div className="stat-item">
                <Card variant="borderless" className="stat-card">
                  <p className="stat-value">{stat.value}</p>
                </Card>
                <p className="stat-title">{stat.title}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Divider />
      <div className="graph-heading">Visual Insights</div>
      <div className="graphs-container">
        <div className="chart-grid-container">
          <div className="chart-card">
            <DoubleBarChart
              title="Budget vs Expense per Category"
              data={doubleGraphData}
            />{" "}
            {/* Double line graph for budget vs expense */}
          </div>

          <div className="chart-card">
            {" "}
            {/* Daily Expense cumulative line graph */}
            <CumulativeExpenseLineChart
              title="Cumulative Expenses vs Budget"
              budget={totalBudget}
              dailyExpenses={dailyExpenseData}
            />
          </div>

          {/* Add more chart cards as needed */}
        </div>

        <Divider />
        <div className="chart-grid-container">
          <div className="chart-card">
            <LineGraph title="Daily Expenses" data={dailyExpenseData} />{" "}
            {/* Daily Expense line graph */}
          </div>

          <div className="chart-card">
            <LineGraph title="Daily Savings" data={dailySavingsData} />{" "}
            {/* Daily Savings line graph */}
          </div>

          {/* Add more chart cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
