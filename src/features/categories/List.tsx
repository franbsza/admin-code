import { Box, Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories, deleteCategory } from '../categories/Slice';
import { 
  DataGrid , 
  GridRowsProp, 
  GridColDef, 
  GridRenderCellParams,
  GridToolbar
} from '@mui/x-data-grid';

export const CategoryList = () => {

const categories = useAppSelector(selectCategories);
const dispatch = useAppDispatch();

const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString("pt-BR") ,
}));

const columns: GridColDef[] = [
  { 
    field: "id", 
    headerName: "ID", 
    flex: 1 
  },
  { 
    field: "name", 
    headerName: "Name", 
    flex: 1 
  },
  { 
    field: "description", 
    headerName: "Description", 
    flex: 1 
  },
  { 
    field: "createdAt", 
    headerName: "Created At", 
    flex: 1 
  },
  { 
    field: "isActive", 
    headerName: "Active", 
    flex: 1,
    type: "boolean",
    renderCell: renderIsActiveCell
  },
  { 
    field: "deleteAction", 
    headerName: "Delete", 
    type: "string",
    flex: 1 ,
    renderCell: renderDeleteActionCell
  },
  { 
    field: "editAction", 
    headerName: "Edit", 
    flex: 1 ,
    renderCell: renderEditActionCell
  }
];

function renderDeleteActionCell(rowData: GridRenderCellParams) {

  console.log(rowData);

  return (
    <IconButton
    color="secondary"
    onClick={() => deleteCategoryById(rowData.row.id)}
    aria-label="delete">
      <DeleteIcon />
    </IconButton>
  )
}

function renderEditActionCell(rowData: GridRenderCellParams) {

return (
<Link to={`/categories/edit/${rowData.id}`} 
style={{ textDecoration: "none" }}
>
    <IconButton>
      <BorderColorIcon color='primary'/>
    </IconButton>
    </Link>
)
}

function renderIsActiveCell(rowData: GridRenderCellParams) {
  return (
    <Typography color={rowData.value ? "primary" : "secondary"}>
      {rowData.value ? "Yes" : "No"}
    </Typography>
  )
}

function deleteCategoryById(id: string) {
  dispatch(deleteCategory(id));
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

        <Box sx={{ display: 'flex', height: 500, width: '100%' }}>
          <DataGrid 
          components={{ 
            Toolbar: GridToolbar
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[2, 10, 100]}
          rows={rows} columns={columns} />
        </Box>
      </Box>
    );
  }