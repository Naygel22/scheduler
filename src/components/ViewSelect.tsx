import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type ViewSelectProps = {
  view: 'day' | 'week' | 'month',
  onChange: (event: SelectChangeEvent) => void
};

export function ViewSelect({ view, onChange }: ViewSelectProps) {
  return (
    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
      <FormControl fullWidth>
        <Select
          value={view}
          onChange={onChange}
        >
          <MenuItem value='day'>Dzień</MenuItem>
          <MenuItem value='week'>Tydzień</MenuItem>
          <MenuItem value='month'>Miesiąc</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}