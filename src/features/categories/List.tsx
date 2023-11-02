import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '../categories/Slice';

import { GridFilterModel } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { CategoryTable } from './components/CategoryTable';

export const CategoryList = () => {

const [page, setPage] = useState(0);
const [perPage, setPerPage] = useState(10);
const [search] = useState(""); 
const [rowsPerPage] = useState([10, 25, 50, 100])

const [options, setOptions] = useState({
  page: page,
  search: search,
  perPage: perPage,
  rowsPerPage: rowsPerPage,
});

const { data, error , isFetching} = useGetCategoriesQuery(options);
const [deleteCategory, { error: deleteError, isSuccess: deleteSuccess }] =
useDeleteCategoryMutation();

function handleOnPageChange(page: number) {
  setPage(page+1);
  setOptions({ ...options, page: page});
}

function handleOnPageSizeChange(perPage: number) {
  setPerPage(perPage);
  setOptions({ ...options, perPage: perPage});
}

function handleFilterChange(filterModel: GridFilterModel) {
  if (!filterModel.quickFilterValues?.length) {
    return setOptions({ ...options, search: "" });
  }

  const search = filterModel.quickFilterValues.join("");
  setOptions({ ...options, search });
}

async function handleDeleteCategory(id: string) {
  await deleteCategory({ id });
}

useEffect(() => {
  if (deleteSuccess) {
    enqueueSnackbar(`Category deleted`, { variant: "success" });
  }
  if (deleteError) {
    enqueueSnackbar(`Category not deleted`, { variant: "error" });
  }
  if(error) {
    enqueueSnackbar(`Error deleting category`, { variant: "error"});
  }
}, [deleteSuccess, deleteError, enqueueSnackbar]);

if (error) {
  return <Typography>Error fetching categories</Typography>;
}

    return (
      
      <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="flex-end">
          <Button 
              variant="contained"
              component={Link}
              color="primary"
              to="/categories/create"
              style={{ marginBottom: "1rem" }}
              >
            New Category
          </Button>
        </Box>

        <CategoryTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
      </Box>
    );
  }