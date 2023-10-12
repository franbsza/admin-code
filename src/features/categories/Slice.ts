import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';
import { Results } from '../../types/Category'

export interface Category {
    id: String;
    name: string;
    description: null | string;
    is_active: boolean;
    deleted_at: null | Date;
    created_at: Date;
    updated_at: Date;
}

const category: Category = {
    id: "1",
    name: 'Category 1',
    description: 'Category 1 Description',
    is_active: false,
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date()
}

export const initialState = [
    category,
    { ...category, id: "2", name: 'Category 1', description: 'Category 1 Description' },
    { ...category, id: "3", name: 'Category 2', description: 'Category 2 Description' },
    { ...category, id: "4", name: 'Category 3', description: 'Category 3 Description' },
]


const endpointUrl = "/categories";

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query}) => ({
        getCategories: query<Results, void>({
            query: () => endpointUrl,
            providesTags: ["Categories"]
        }),
    }),
}); 


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        createCategory(state, action) {
            state.push(action.payload);
        },
        updateCategory(state, action) {
            const index = state.findIndex((category) => category.id === action.payload.id);
            state[index] = action.payload;
        },
        deleteCategory(state, action) {
            const index = state.findIndex((category) => category.id === action.payload);
            state.splice(index, 1);
        },
    }
});

export const selectCategories = (state: RootState) => state.categories

export const selectCategoryById = (state: RootState, id: String) => {
    const category = state.categories.find((category) => category.id === id);
    return category || {
        id: "",
        name: "",
        description: "",
        is_active: false,
        deleted_at: null,
        created_at: new Date(),
        updated_at: new Date(),
    };
}

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions
export const {
    useGetCategoriesQuery
} = categoriesApiSlice