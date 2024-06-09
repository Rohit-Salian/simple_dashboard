import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import StyledSelect from "../../common/StyledSelect";

type DayWiseActivityItem = {
  count: string;
  label: string;
  fillColor: string;
};

type DayWiseActivity = {
  date: string;
  items: {
    children: DayWiseActivityItem[];
  };
};

type Person = {
  mail: string;
  naav: string;
  activeDays: {
    days: number;
    isBurnOut: boolean;
    insight: string[];
  };
  dayWiseActivity: DayWiseActivity[];
};

type DayWiseActivityChartProps = {
  data: Person[];
};

export const DayWiseActivityChart: React.FC<DayWiseActivityChartProps> = ({
  data,
}) => {
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (selectedPerson) {
      const person = data.find((person) => person.mail === selectedPerson);
      if (person) {
        const labels = person.dayWiseActivity.map((activity) => activity.date);
        const activities = person.dayWiseActivity[0].items.children.map(
          (item) => item.label
        );
        const datasets = activities.map((activity, index) => ({
          label: activity,
          data: person.dayWiseActivity.map((day) =>
            parseInt(day.items.children[index].count, 10)
          ),
          backgroundColor:
            person.dayWiseActivity[0].items.children[index].fillColor,
        }));

        setChartData({
          labels,
          datasets,
        });
      }
    } else {
      setChartData({
        labels: [],
        datasets: [],
      });
    }
  }, [data, selectedPerson]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Day-wise Activity",
      },
    },
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Day Wise Activity
      </Typography>
      <StyledSelect
        data={data}
        value={selectedPerson}
        onChange={setSelectedPerson}
        label="Select User"
        dataCy="daywise-user-filter"
        sx={{ width: 200 }}
      />
      {chartData.labels &&
      chartData.labels.length > 0 &&
      chartData.datasets.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Typography variant="body1">
          No data available. Please select a person.
        </Typography>
      )}
    </>
  );
};
