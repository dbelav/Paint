import { configureStore } from '@reduxjs/toolkit'
import canvasState from '../components/canvas/canvasSlice'
import toolsState from '../components/tools/toolsSlice'

const store = configureStore({
    reducer: {
        canvasState,
        toolsState
    },
})

export default store