import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { getAuthorNameList, getMinMaxDates } from "../common/helper";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFilter, resetFilter } from "../redux/FilterReducer";
import dayjs from "dayjs";

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Filter = ({ authorDataAll, setFilteredUserData }) => {
  const dispatch = useDispatch();
  const { minDate, maxDate } = getMinMaxDates(authorDataAll);
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  const [authorList] = useState(getAuthorNameList(authorDataAll));
  const [selectedUsers, setSelectedUsers] = useState(authorList);

  const handleSelectAll = ({ target }) => {
    if (target.value.includes("all")) {
      const newSelectedUsers =
        selectedUsers.length === authorList.length ? [] : authorList;
      setSelectedUsers(newSelectedUsers);
      dispatch(addFilter(newSelectedUsers));
    } else {
      setSelectedUsers(target.value);
      dispatch(addFilter(target.value));
    }
  };

  const handleReset = () => {
    setSelectedUsers(authorList);
    setStartDate(minDate);
    setEndDate(maxDate);
    // setFilteredUserData([]);
    dispatch(resetFilter(authorList));
  };

  useEffect(() => {
    const result = authorDataAll
      ?.filter(({ name }) => selectedUsers?.some(({ mail }) => mail === name))
      ?.map(({ name, totalActivity, activeDays, dayWiseActivity }) => {
        const user = selectedUsers?.find(({ mail }) => mail === name);

        const filteredDayWiseActivity = dayWiseActivity?.filter(({ date }) => {
          const activityDate = dayjs(date);
          return (
            activityDate.isSame(startDate, "day") ||
            activityDate.isSame(endDate, "day") ||
            activityDate.isBetween(startDate, endDate, null, "[]")
          );
        });

        return {
          mail: name,
          naav: user.naav,
          totalActivity,
          activeDays,
          dayWiseActivity: filteredDayWiseActivity,
        };
      });
    setFilteredUserData(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUsers, startDate, endDate]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="global-user-filter">Select User</InputLabel>
            <Select
              labelId="global-user-filter"
              id="global-user-filter"
              multiple
              value={selectedUsers}
              onChange={handleSelectAll}
              input={<OutlinedInput label="Select User" />}
              renderValue={(selectedUsers) =>
                selectedUsers.map((dev: string) => dev.naav).join(", ")
              }
              MenuProps={MenuProps}
              data-cy="Just for illustration Global filter"
            >
              <MenuItem value="all">
                <Checkbox
                  checked={selectedUsers.length === authorList.length}
                  indeterminate={
                    selectedUsers.length > 0 &&
                    selectedUsers.length < authorList.length
                  }
                />
                <ListItemText primary="Select All" />
              </MenuItem>
              {authorList.map((option) => (
                <MenuItem key={option.naav} value={option}>
                  <Checkbox
                    checked={selectedUsers.some(
                      (dev) => dev.naav === option.naav
                    )}
                  />
                  <ListItemText primary={option.naav} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <DatePicker
            label="Select Start Date"
            minDate={minDate}
            maxDate={endDate}
            defaultValue={minDate}
            value={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Grid>
        <Grid item xs={2}>
          <DatePicker
            label="Select End Date"
            minDate={startDate}
            maxDate={maxDate}
            defaultValue={maxDate}
            value={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
          <Button variant="outlined" onClick={handleReset}>
            Reset Filter
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
