import { capitalize } from "@mui/material";

export const getAuthorNameList = (data) => {
  return data?.map(({ name }) => {
    const [username] = name.split("@");
    const [firstName] = username.split(".");
    return { naav: capitalize(firstName), mail: name };
  });
};

export const getMinMaxDates = (data) => {
  const dates = data?.flatMap((user) =>
    user.dayWiseActivity?.map((activity) => new Date(activity.date))
  );
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  return { minDate, maxDate };
};
