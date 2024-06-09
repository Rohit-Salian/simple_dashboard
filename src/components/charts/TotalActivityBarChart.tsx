import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Typography } from "@mui/material";
import { Activity, ActivityMeta } from "../../types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type User = {
  naav: string;
  totalActivity: Activity[];
};

type TotalActivityBarChart = {
  data: User[];
  activities: ActivityMeta[];
};

const TotalActivityBarChart: React.FC<TotalActivityBarChart> = ({
  data,
  activities,
}) => {
  const chartData = {
    labels: activities.map(({ label }) => label),
    datasets: data.map((user, index) => ({
      label: user.naav,
      data: user.totalActivity.map((activity) => activity.value),
      backgroundColor: `rgba(${index * 50}, ${index * 100}, ${
        index * 240
      }, 0.5)`,
    })),
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "User Activities",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Activities",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Total Activity
      </Typography>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default TotalActivityBarChart;
