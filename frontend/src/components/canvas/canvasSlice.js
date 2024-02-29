import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    canvas: null,
    undoList: [],
    redoList: [],
    username: '',
    socket: null,
}

const canvasState = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        initialCanvas: (state) => {
            state.canvas = 5
        },
        pushToUndoList: (state, action) => {
            state.undoList.push(action.payload)
        },
        pushToRedoList: (state, action) => {
            state.redoList.push(action.payload)
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setSocket: (state, action) => {
            state.socket = action.payload
        },
    },
})

const { actions, reducer } = canvasState

export default reducer

export const {
    initialCanvas,
    pushToUndoList,
    pushToRedoList,
    setUsername,
    setSocket,
} = actions
