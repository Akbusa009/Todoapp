import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FilterListIcon from "@mui/icons-material/FilterList";
import TodayIcon from "@mui/icons-material/Today";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Priority = "All" | "Low" | "Medium" | "High";
type DateRange = "All" | "Today" | "ThisWeek" | "ThisMonth";

interface Props {
  priority: Priority;
  date: DateRange;
  onPriorityChange: (p: Priority) => void;
  onDateChange: (d: DateRange) => void;
}


const ControlsBar: React.FC<Props> = ({ priority, date, onPriorityChange, onDateChange }) => {
  // anchor state for each menu
  const [anchorFilter, setAnchorFilter] = React.useState<null | HTMLElement>(null);
  const [anchorDate, setAnchorDate] = React.useState<null | HTMLElement>(null);

  const openFilter = (e: React.MouseEvent<HTMLElement>) => setAnchorFilter(e.currentTarget);
  const closeFilter = () => setAnchorFilter(null);

  const openDate = (e: React.MouseEvent<HTMLElement>) => setAnchorDate(e.currentTarget);
  const closeDate = () => setAnchorDate(null);

  const handleSelectPriority = (p: Priority) => {
    onPriorityChange(p);
    closeFilter();
  };

  const handleSelectDate = (d: DateRange) => {
    onDateChange(d);
    closeDate();
  };

  const pillSx = {
    borderRadius: 1,
    textTransform: "none",
    minWidth: 160,
    px: 1,
    py: 0.6,
    border: "2px solid rgba(15,23,42,0.06)",
    bgcolor: "background.paper",
    boxShadow: "none",
    justifyContent: "flex-start",
  } as const;

  const smallLabelSx = { fontSize: 13, color: "text.primary", fontWeight: 600 };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {/* Filter pill */}
      <Box>
        <Button
          onClick={openFilter}
          aria-controls={anchorFilter ? "filter-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={anchorFilter ? "true" : undefined}
          variant="contained"
          disableElevation
          sx={{
            ...pillSx,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FilterListIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <Box sx={{ textAlign: "left", flex: 1 , p: 1}}>
            <Typography component="div" sx={smallLabelSx}>
              Filter
            </Typography>
            <Typography component="div" sx={{ fontSize: 12, color: "text.secondary", mt: 0.2 }}>
              {/* {priority === "All" ? "All priorities" : priority} */}
            </Typography>
          </Box>

          <ExpandMoreIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Button>

        <Menu
          id="filter-menu"
          anchorEl={anchorFilter}
          open={Boolean(anchorFilter)}
          onClose={closeFilter}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: { minWidth: 200, borderRadius: 1.5 } }}
        >
          <MenuItem selected={priority === "All"} onClick={() => handleSelectPriority("All")}>
            All priorities
          </MenuItem>
          <Divider />
          <MenuItem selected={priority === "Low"} onClick={() => handleSelectPriority("Low")}>
            Low
          </MenuItem>
          <MenuItem selected={priority === "Medium"} onClick={() => handleSelectPriority("Medium")}>
            Medium
          </MenuItem>
          <MenuItem selected={priority === "High"} onClick={() => handleSelectPriority("High")}>
            High
          </MenuItem>
        </Menu>
      </Box>

      {/* Date pill */}
      <Box>
        <Button
          onClick={openDate}
          aria-controls={anchorDate ? "date-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={anchorDate ? "true" : undefined}
          variant="contained"
          disableElevation
          sx={{
            ...pillSx,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TodayIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <Box sx={{ textAlign: "left", flex: 1 , p: 1}}>
            <Typography component="div" sx={smallLabelSx}>
              Today
            </Typography>
            <Typography component="div" sx={{ fontSize: 12, color: "text.secondary", mt: 0.2 }}>
              {/* {date === "All" ? "All dates" : date === "ThisWeek" ? "This week" : date === "ThisMonth" ? "This month" : "Today"} */}
            </Typography>
          </Box>

          <ExpandMoreIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Button>

        <Menu
          id="date-menu"
          anchorEl={anchorDate}
          open={Boolean(anchorDate)}
          onClose={closeDate}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: { minWidth: 200, borderRadius: 1.5 } }}
        >
          <MenuItem selected={date === "All"} onClick={() => handleSelectDate("All")}>
            All dates
          </MenuItem>
          <Divider />
          <MenuItem selected={date === "Today"} onClick={() => handleSelectDate("Today")}>
            Today
          </MenuItem>
          <MenuItem selected={date === "ThisWeek"} onClick={() => handleSelectDate("ThisWeek")}>
            This week
          </MenuItem>
          <MenuItem selected={date === "ThisMonth"} onClick={() => handleSelectDate("ThisMonth")}>
            This month
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
};

export default ControlsBar;