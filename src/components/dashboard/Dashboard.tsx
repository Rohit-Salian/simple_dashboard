import { data } from "../../../data.json";
import { Grid, Paper } from "@mui/material";
import {
  ActivityMeta,
  AuthorData,
  AuthorWorklog,
  Data,
  FilteredData,
} from "../../types/types";

import { useEffect, useState } from "react";
import TotalActivityBarChart from "../charts/TotalActivityBarChart";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import { Filter } from "../Filter";
import { DayWiseActivityChart } from "../charts/DayWiseActivityChart";
import InsightChart from "../charts/InsightChart";
import { styles } from "../../common/styles";
import CircularProgressBar from "../../common/CircularProgressBar";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const Dashboard: React.FC = () => {
  const [data1, setData1] = useState({});
  const authorData: Data = data;
  const authorWorklog: AuthorWorklog = authorData?.AuthorWorklog;

  const activityMeta: ActivityMeta[] = authorWorklog?.activityMeta;
  const authorDataAll: AuthorData[] = authorWorklog?.rows;
  const [filteredUserData, setFilteredUserData] = useState<FilteredData[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("../../../data.json");
      const result = await response.json();
      setData1(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2} px={4} my={2}>
      {loading && <CircularProgressBar />}
      <Grid item xs={12}>
        <Filter
          authorDataAll={authorDataAll}
          setFilteredUserData={setFilteredUserData}
        />
      </Grid>

      <Grid item xs={6}>
        <Paper elevation={3} sx={styles.paperStyle}>
          <TotalActivityBarChart
            data={filteredUserData}
            activities={activityMeta}
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} sx={styles.paperStyle}>
          <DayWiseActivityChart data={filteredUserData} />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} sx={styles.paperStyle}>
          <InsightChart data={filteredUserData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
