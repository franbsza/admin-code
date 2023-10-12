import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Switch,
    TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Category } from '../../categories/Slice';

type Props = {
    category: Category;
    isDisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    hadleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CategoryForm({
    category,
    isDisabled = false,
    isLoading = false,
    handleSubmit,
    hadleChange,
    handleToggle
}: Props) {

    return (
        <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                      <Switch name="is_active"
                      color="secondary"
                      onChange={handleToggle}
                      checked={category.is_active}
                      inputProps={{ 'aria-label': 'controlled' }}
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
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
    );
}