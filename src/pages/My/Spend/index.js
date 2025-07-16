import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip as ChartTooltip,
  Legend as ChartLegend
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import {
  LineChart,
  Line as RechartLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  Legend as RLegend,
  ResponsiveContainer
} from 'recharts';

// Đăng ký các thành phần cho Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ChartTooltip,
  ChartLegend
);

// Dữ liệu cho chart.js
const dataChartJS = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'],
  datasets: [
    {
      label: 'Doanh thu',
      data: [4000, 3000, 5000, 7000],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

// Dữ liệu cho Recharts
const dataRecharts = [
  { month: 'Tháng 1', value: 4000 },
  { month: 'Tháng 2', value: 3000 },
  { month: 'Tháng 3', value: 5000 },
  { month: 'Tháng 4', value: 7000 }
];

function MySpend() {
  return (
    <>
      <h1>MySpend</h1>

      {/* Biểu đồ Chart.js */}
      <Line data={dataChartJS} />

      {/* Biểu đồ Recharts */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataRecharts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <RTooltip />
          <RLegend />
          <RechartLine type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default MySpend;
