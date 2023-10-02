import { configureStore } from '@reduxjs/toolkit';
import MenuSlice from './slice/MenuSlice';
import ToolboxSlice from './slice/ToolboxSlice';

const store = configureStore({
    reducer:{                               // Add all the reducers
        menuReducer: MenuSlice,
        toolboxReducer: ToolboxSlice
    }
})

export default store