import * as React from 'react';
import { Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import Header from './components/Header';
import Layout from './components/Layout';
import { appTheme } from './config/Theme';
import { Routes , Route } from 'react-router-dom';
import { CategoryList } from './features/categories/List';
import { CreateCategory } from './features/categories/Create';
import { EditCategory } from './features/categories/Edit';
import { SnackbarProvider } from 'notistack'

function App(){
  return (
    <ThemeProvider theme={ appTheme }>
      <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
          vertical: 'top', 
          horizontal: 'center'}}
          autoHideDuration={3000}
          >
      <Box 
      component="main" 
      sx={{ 
        height: '100vh',
        backgroundColor: '#f5f5f1', 
         }}>

      <Header />
      <Layout>

          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<CreateCategory />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path='*' element={
               <Box>
                <Typography variant="h1" component="h1">404</Typography>
               <Typography variant="h1" component="h1">Page not found</Typography>
             </Box>
            } />
          </Routes>
      </Layout>    
      </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;