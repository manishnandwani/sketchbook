import { BRUSH_SIZE, COLORS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    activeColor: COLORS.BLACK,
    brushSize: BRUSH_SIZE
}

const ToolboxSlice = createSlice({
    name: 'toolbox',
    initialState,
    reducers : {
        changeActiveColor: (state, action) => {
            state.activeColor = action.payload
        },
        changeBrushSize: (state, action) => {
            state.brushSize = action.payload
        }
    }
})

export const { changeActiveColor, changeBrushSize } = ToolboxSlice.actions;

export default ToolboxSlice.reducer;