import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMouseDown: false,
    mouseX: null,
    mouseY: null,
    selectedTool: 'pencil',
    color: '#000000',
    lineThickness: 5
}

const toolsState = createSlice({
    name: 'tools',
    initialState,
    reducers: {
        switchMouseClick: (state, action) =>{      
            state.isMouseDown =  action.payload
        },    

        setMouseX: (state, action) =>{
            state.mouseX = action.payload
        }, 

        setMouseY: (state, action) =>{
            state.mouseY = action.payload
        }, 

        setTool: (state, action) =>{
            state.selectedTool = action.payload
        }, 

        setColor: (state, action) =>{
            state.color = action.payload
            console.log(action.payload)
        }, 

        setLineThickness: (state, action) =>{
            state.lineThickness = action.payload
        }, 
    }
})

const {actions, reducer} = toolsState

export default reducer

export const { switchMouseClick,
    setMouseX,
    setMouseY,
    setTool,
    setColor,
    setLineThickness
    } = actions