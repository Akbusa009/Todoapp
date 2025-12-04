import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import TodayIcon from "@mui/icons-material/Today";
import Tooltip from "@mui/material/Tooltip";

type PriorityFilter = "All" | "Low" | "Medium" | "High";
type DateFilter = "All" | "Today" | "ThisWeek" | "ThisMonth";

interface Props {
  priority: PriorityFilter;
  date: DateFilter;
  onPriorityChange: (p: PriorityFilter) => void;
  onDateChange: (d: DateFilter) => void;
}

const ControlsBar: React.FC<Props> = ({ priority, date, onPriorityChange, onDateChange }) => {
  return (
    <Box display="flex" gap={2} alignItems="center">
      {/* Filter */}
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="priority-filter-label">
          <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
            <FilterListIcon fontSize="small" /> Filter
          </Box>
        </InputLabel>
        <Select
          labelId="priority-filter-label"
          value={priority}
          label="Filter"
          onChange={(e) => onPriorityChange(e.target.value as PriorityFilter)}
        >
          <MenuItem value="All">All priorities</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>

      {/* Date / Today control */}
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="date-filter-label">
          <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
            <TodayIcon fontSize="small" /> Today
          </Box>
        </InputLabel>
        <Select
          labelId="date-filter-label"
          value={date}
          label="Today"
          onChange={(e) => onDateChange(e.target.value as DateFilter)}
        >
          <MenuItem value="All">All dates</MenuItem>
          <MenuItem value="Today">Today</MenuItem>
          <MenuItem value="ThisWeek">This week</MenuItem>
          <MenuItem value="ThisMonth">This month</MenuItem>
        </Select>
      </FormControl>

      {/* optional compact reset button */}
      <Tooltip title="Reset filters">
        <IconButton size="small" onClick={() => { onPriorityChange("All"); onDateChange("All"); }}>
          <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", background: "transparent" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ControlsBar;
