import { CategoryResponse } from "../../../types/Category";
import { 
    DataGrid ,  
    GridColDef, 
    GridRenderCellParams,
    GridToolbar,
    GridFilterModel
  } from '@mui/x-data-grid';
import { Box,IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from 'react-router-dom';

type Props = {
    data: CategoryResponse | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number[];

    handleOnPageChange: (page:number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
    handleDelete: (id: string) => void;
  }

export function CategoryTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete
}: Props){

    const componentProps={
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
    };

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

      function mapDataToGridRows(data: CategoryResponse) {
        const { data: categories } = data;
        return categories.map((category) => ({
          id: category.id,
          name: category.name,
          isActive: category.isActive,
          created_at: new Date(category.createdAt).toLocaleDateString("pt-BR"),
        }));
      }


    function renderDeleteActionCell(rowData: GridRenderCellParams) {
        return (
          <IconButton
          color="secondary"
          onClick={() => handleDelete(rowData.row.id)}
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

      const rows = data ? mapDataToGridRows(data) : [];
      const rowCount = data?.meta.total || 0;

      return (
        <Box sx={{ display: 'flex', height: 600, width: '100%' }}>
            <DataGrid 
            rows={rows}
            pagination={true}
            columns={columns}
            pageSize={perPage}
            filterMode="server"
            rowCount={rowCount}
            loading={isFetching}
            paginationMode="server"
            checkboxSelection={false}
            disableColumnFilter={true}
            disableColumnSelector={true}
            disableDensitySelector={true}
            rowsPerPageOptions={rowsPerPage}
            componentsProps={componentProps}
            onPageChange={handleOnPageChange}
            components={{ Toolbar: GridToolbar }}
            onFilterModelChange={handleFilterChange}
            onPageSizeChange={handleOnPageSizeChange}
            />
        </Box>
      );
}