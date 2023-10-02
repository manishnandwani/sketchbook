import { MENU_ITEMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeMenuItem : MENU_ITEMS.PENCIL,
    activeActionItem : null,
}

const MenuSlice = createSlice({                         // create a slice for the store
    name :'menu',                                       // name should be there for the reducer
    initialState,
    reducers :{                                      
        changeActiveMenuItem: (state, action) => {      //action1 :  state is automatically be initial state, first Argument is action.payload
            state.activeMenuItem = action.payload;
        },
        changeActiveActionItem : (state, action) =>{
            state.activeActionItem = action.payload;
        }

    }
})

export const { changeActiveMenuItem, changeActiveActionItem } = MenuSlice.actions;  // Export the actions

export default MenuSlice.reducer                            // Export the reducer