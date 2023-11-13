import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Category, CategoryParams, CategoryResponse } from '../../types/Category';
import { apiSlice } from '../api/apiSlice';


// const category: Category = {
//     id: "1",
//     name: 'Category 1',
//     description: 'Category 1 Description',
//     isActive: false,
//     deletedAt: null,
//     createdAt: new Date(),
//     updatedAt: new Date()
// }

// export const initialState = [
//     category,
//     { ...category, id: "2", name: 'Category 1', description: 'Category 1 Description' },
//     { ...category, id: "3", name: 'Category 2', description: 'Category 2 Description' },
//     { ...category, id: "4", name: 'Category 3', description: 'Category 3 Description' },
// ]


const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams){
    const query = new URLSearchParams();

    if(params.page){
        query.append("page", params.page.toString());
    }
    if(params.perPage){
        query.append("per_page", params.perPage.toString());
    }
    if(params.search){
        query.append("search", params.search);
    }
    if(params.isActive){
        query.append("is_active", params.isActive.toString());
    }
    return query.toString();
}

function getCategories({page=0, perPage=10, search=""}){
    const params = {page: page, perPage: perPage, search: search}; 
    return `${endpointUrl}?${parseQueryParams(params)}`
}

function deleteCategoryMutation(category: Category) {
    return {
      url: `${endpointUrl}/${category.id}`,
      method: "DELETE",
    };
}

function createCategoryMutation(category: Category) {
    return { 
        url: endpointUrl, 
        method: "POST", 
        body: category 
    };
  }

  function updateCategoryMutation(category: Category) {
    return {
      url: `${endpointUrl}/${category.id}`,
      method: "PUT",
      body: category,
    };
  }

  function getCategory({ id }: { id: string }) {
    return `${endpointUrl}/${id}`;
  }

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getCategories: query<CategoryResponse, CategoryParams>({
            query: getCategories,
            providesTags: ["Categories"]
        }),
        getCategory: query<Category, { id: string }>({
            query: getCategory,
            providesTags: ["Categories"],
        }),
        createCategory: mutation<Category, Category>({
            query: createCategoryMutation,
            invalidatesTags: ["Categories"]
        }),
        deleteCategory: mutation<CategoryResponse, {id: String}>({
            query: deleteCategoryMutation,
            invalidatesTags: ["Categories"]
        }),
        updateCategory: mutation<Category, Category>({
            query: updateCategoryMutation,
            invalidatesTags: ["Categories"],
          }),
    }),
}); 


// const categoriesSlice = createSlice({
//     name: 'categories',
//     initialState: initialState,
//     reducers: {
//         createCategory(state, action) {
//             state.push(action.payload);
//         },
//         updateCategory(state, action) {
//             const index = state.findIndex((category) => category.id === action.payload.id);
//             state[index] = action.payload;
//         },
//         deleteCategory(state, action) {
//             const index = state.findIndex((category) => category.id === action.payload);
//             state.splice(index, 1);
//         },
//     }
// });

//export const selectCategories = (state: RootState) => state.categories

// export const selectCategoryById = (state: RootState, id: String) => {
//     const category = state.categories.find((category) => category.id === id);
//     return category || {
//         id: "",
//         name: "",
//         description: "",
//         isActive: false,
//         deletedAt: null,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     };
// }

// export default categoriesSlice.reducer;
// export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions
export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryQuery
} = categoriesApiSlice