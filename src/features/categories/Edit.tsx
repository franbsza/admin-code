import { 
  Box, Typography, Paper} 
  from '@mui/material';
  import { useState } from 'react';
  import { useParams } from 'react-router-dom';
  import { useAppSelector, useAppDispatch } from '../../app/hooks';
  import { CategoryForm } from '../categories/components/CategoryForm';
  import { Category , selectCategoryById, updateCategory} from '../categories/Slice';
  import { SnackbarProvider, useSnackbar } from 'notistack'
 
export const EditCategory = () => {

  const id = useParams().id || "";  
  const [isDisabled, setIsDisabled] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id));
  const [categoryState, setCategoryState] = useState<Category>(category);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

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
    setIsDisabled(true);
    dispatch(updateCategory(categoryState));
    enqueueSnackbar("Category updated", { variant: "success" });
  };

    return (

      <Box>
        <Paper>
          <Box p={2}>
              <Typography variant="h4" component="h4">Edit Category</Typography>
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