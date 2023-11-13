import { Box, Typography, Paper, SelectChangeEvent} from '@mui/material';
import { CategoryForm } from './components/CategoryForm';
import { useEffect, useState } from 'react';
import { useCreateCategoryMutation} from '../categories/Slice';
import { Category } from '../../types/Category';
import { useSnackbar } from 'notistack';
import { DatePicker, DateValidationError, PickerChangeHandlerContext,  } from '@mui/x-date-pickers';
import { UsePickerValueBaseProps } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types';


export const CreateCategory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createCategory, status] = useCreateCategoryMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    isActive: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    rate: 1
  });

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

  const hadleSelectChange = (e: SelectChangeEvent<Number>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
    console.log(name, value);
  };

  const handleDatePickerChange = (value: Date | null) => {
    const data =  value || new Date();
    setCategoryState({ ...categoryState, updatedAt: data });
    console.log(value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    await createCategory(categoryState);
  };

  useEffect(() => {
    if(status.isSuccess){
      enqueueSnackbar("Category created successfully", { variant: "success" });
      setIsDisabled(true);
    }
    if(status.error){
      enqueueSnackbar("Category not created", { variant: "error" });
    }
  }, [enqueueSnackbar, status.isSuccess, status.error]);

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
          hadleSelectChange={hadleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          />
        </Paper>
      </Box>
   );
  }