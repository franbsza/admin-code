import { Box, Typography, Paper} from '@mui/material';
import { CategoryForm } from './components/CategoryForm';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Category , createCategory} from '../categories/Slice';

export const CreateCategory = () => {

  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
    console.log(name, value);
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
    console.log(name, checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory(categoryState));
  };

    return (

      <Box>
        <Paper>
          <Box p={2}>
              <Typography variant="h4" component="h4">New Category</Typography>
          </Box>

          <CategoryForm
          category={categoryState}
          isDisabled={false}
          isLoading={false}
          handleSubmit={handleSubmit}
          hadleChange={handleChange}
          handleToggle={handleToggle}
          />

        </Paper>
      </Box>
   );
  }