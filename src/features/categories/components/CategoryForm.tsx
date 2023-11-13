import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Category } from '../../../types/Category';
import { DatePicker, DateValidationError, PickerChangeHandlerContext,  } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { PickerSelectionState, UsePickerValueBaseProps } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types';


type Props = {
    category: Category;
    isDisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    hadleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hadleSelectChange: (e: SelectChangeEvent<Number>) => void;
    handleDatePickerChange : (value: Date | null) => void;
}

export function CategoryForm({
    category,
    isDisabled = false,
    isLoading = false,
    handleSubmit,
    hadleChange,
    handleToggle,
    hadleSelectChange,
    handleDatePickerChange
}: Props) {

    return (
        <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>

                <Grid>
                  <DatePicker 
                  
                  onChange={handleDatePickerChange}
                  />
                </Grid>

                <Grid>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="rate"
                  defaultValue={10}
                  value={category.rate} 
                  label="Age"
                  onChange={hadleSelectChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>

                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                      <TextField 
                      name="name" 
                      label="Name" 
                      value={category.name}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                      <TextField 
                      name="description" 
                      label="Description" 
                      value={category.description}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="isActive"
                        color="secondary"
                        onChange={handleToggle}
                        checked={category.isActive || false}
                        inputProps={{ "aria-label": "controlled" }}
                        data-testid="isActive"
                        disabled={isDisabled}
                      />
                    }
                    label="Active"
                  />
                </FormGroup>
              </Grid>

                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button 
                    component={Link} 
                    to="/categories"
                    variant="contained" 
                    color="success"
                    disabled={isDisabled}
                    >
                      Back
                    </Button>

                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary"
                    disabled={isDisabled}
                    >
                      {isLoading ? "Loading..." : "Save"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
    );
}