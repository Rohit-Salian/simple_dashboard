import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import StyledSelect from "../../common/StyledSelect";
import { FilteredData } from "../../types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface InsightChartProps {
  data: FilteredData[];
}

const InsightChart: React.FC<InsightChartProps> = ({ data }) => {
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [person, setPerson] = useState<FilteredData>();

  useEffect(() => {
    if (selectedPerson) {
      const person = data?.find((person) => person.mail === selectedPerson);
      setPerson(person);
    }
  }, [selectedPerson, data]);

  const chartData = {
    labels: ["Active Days", "Remaining Days"],
    datasets: [
      {
        data: [person?.activeDays?.days, 14 - person?.activeDays?.days],
        backgroundColor: ["#4caf50", "#ff9800"],
        hoverBackgroundColor: ["#66bb6a", "#ffb74d"],
      },
    ],
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Active Days
      </Typography>
      <StyledSelect
        data={data}
        value={selectedPerson}
        onChange={setSelectedPerson}
        label={`dev-insight-filter`}
        sx={{ width: 200 }}
      />
      <Card>
        <CardContent>
          <Typography variant="h5">{person?.naav}</Typography>
          <Typography variant="body1">{person?.mail}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Doughnut data={chartData} />
        </CardContent>
      </Card>

      {person &&
        person?.activeDays &&
        person?.activeDays?.insight &&
        person?.activeDays?.insight?.length > 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6">Insights</Typography>
              <List>
                {person.activeDays.insight.map((insight: [], index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={insight} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
    </>
  );
};

export default InsightChart;
