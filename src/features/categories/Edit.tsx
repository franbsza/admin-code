import { 
  Box, Typography, Paper} 
  from '@mui/material';
  import { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import { CategoryForm } from '../categories/components/CategoryForm';
  import { useGetCategoryQuery, useUpdateCategoryMutation} from '../categories/Slice';
  import { useSnackbar } from 'notistack'
import { Category } from '../../types/Category';
 
export const EditCategory = () => {

  const id = useParams().id as string;
  const { data: category, isFetching } = useGetCategoryQuery({ id });
  const [isDisabled, setIsDisabled] = useState(false);
  const [updateCategory, status] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    description: "",
  });

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
    updateCategory(categoryState);
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category);
    }
  }, [category]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Category updated successfully", { variant: "success" });
      setIsDisabled(false);
    }
    if (status.error) {
      enqueueSnackbar("Category not updated", { variant: "error" });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

    return (

      <Box>
        <Paper>
          <Box p={2}>
              <Typography variant="h4" component="h4">Edit Category</Typography>
          </Box>

          <CategoryForm
          category={categoryState}
          isDisabled={status.isLoading}
          isLoading={false}
          handleSubmit={handleSubmit}
          hadleChange={handleChange}
          handleToggle={handleToggle}
          />
         
        </Paper>
      </Box>
    );
  }