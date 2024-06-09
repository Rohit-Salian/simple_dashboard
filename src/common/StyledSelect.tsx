import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SxProps,
} from "@mui/material";
import { Theme } from "@mui/system";
import { styles } from "./styles";

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

type StyledSelectProps = {
  data: Person[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  sx?: SxProps<Theme>;
  dataCy?: string;
};

const StyledSelect: React.FC<StyledSelectProps> = ({
  data,
  value = "",
  onChange,
  label = "no label specified",
  sx = { width: 300 },
  dataCy,
}) => {
  const [randomValue, setRandomValue] = useState<string>("");

  useEffect(() => {
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomPerson = data[randomIndex];
      setRandomValue(randomPerson.mail);
      onChange(randomPerson.mail);
    }
  }, [data, onChange]);

  return (
    <FormControl sx={sx} fullWidth>
      <InputLabel id={label}>Select User</InputLabel>
      <Select
        label={label}
        id={label}
        onChange={(e) => onChange(e.target.value as string)}
        value={value || randomValue}
        data-cy={dataCy}
        placeholder={label}
      >
        {data.length === 0 ? (
          <MenuItem value="" disabled>
            <ListItemText primary="Select Global User" />
          </MenuItem>
        ) : (
          data.map((person) => (
            <MenuItem key={person.mail} value={person.mail}>
              <ListItemText primary={person.naav} />
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default StyledSelect;
