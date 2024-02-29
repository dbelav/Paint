import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pencilDown, pencilMove } from '../../toolsitem/pencil'
import { switchMouseClick, setMouseX, setMouseY } from '../tools/toolsSlice'
import useSelectTool from '../../hooks/useSelectTool'
import { useParams } from 'react-router-dom'

import './canvas.scss'

const socketConnection = new WebSocket('ws://localhost:5000')

const Canvas = () => {
    const dispatch = useDispatch()

    const canvasDomElement = useRef(null)
    const drawElementRef = useRef(null)
    const [websocketTool, setWebsocketTool] = useState('')
    const params = useParams()

    const { isMouseDown } = useSelector((state) => state.toolsState)
    const { mouseX } = useSelector((state) => state.toolsState)
    const { mouseY } = useSelector((state) => state.toolsState)
    const { selectedTool } = useSelector((state) => state.toolsState)
    const { lineThickness } = useSelector((state) => state.toolsState)
    const { color } = useSelector((state) => state.toolsState)
    const { undoList } = useSelector((state) => state.toolsState)
    const { redoList } = useSelector((state) => state.toolsState)
    const { username } = useSelector((state) => state.canvasState)
    const { selectToolDown, selectToolMove } = useSelectTool(selectedTool) // for user drawing
    const websocketSelectTool = useSelectTool(websocketTool) // for websocket drawing

    useEffect(() => {
        drawElementRef.current = canvasDomElement.current.getContext('2d')
    }, [])

    useEffect(() => {
        if (username) {
            socketConnection.onopen = () => {
                socketConnection.send(
                    JSON.stringify({
                        id: params.id,
                        username,
                        method: 'connection',
                    })
                )
            }
            socketConnection.onmessage = (e) => {
                const message = JSON.parse(e.data)
                switch (message.method) {
                    case 'connection':
                        console.log('Connected: ' + message.username)
                        break
                }
            }
        }
    }, [username, socketConnection])

    function mouseDown(e) {
        const drawElement = drawElementRef.current

        dispatch(switchMouseClick(true))
        dispatch(setMouseX(e.nativeEvent.offsetX))
        dispatch(setMouseY(e.nativeEvent.offsetY))

        selectToolDown({
            drawElement,
            canvasDomElement: canvasDomElement,
            e,
            lineThickness,
            color,
            startX: mouseX,
            startY: mouseY,
            socket: socketConnection,
        })
    }

    function mouseUp() {
        dispatch(switchMouseClick(false))
    }

    useEffect(() => {
        const drawElement = canvasDomElement.current.getContext('2d')

        socketConnection.onmessage = (e) => {
            const data = JSON.parse(e.data)
            setWebsocketTool(data.tool)

            if (data.username != username) {

                if (data.method === 'downDraw') {
                    websocketSelectTool.selectToolDown({
                        drawElement,
                        canvasDomElement: canvasDomElement,
                        e: null,
                        lineThickness: data.lineThickness,
                        color: data.color,
                        startX: data.startX,
                        startY: data.startY,
                        x: data.x,
                        y: data.y,
                    })
                }

                if (data.method === 'moveDraw') {
                    websocketSelectTool.selectToolMove({
                        drawElement,
                        canvasDomElement: canvasDomElement,
                        e: null,
                        lineThickness: data.lineThickness,
                        color: data.color,
                        startX: data.startX,
                        startY: data.startY,
                        x: data.x,
                        y: data.y,
                    })
                }
            }
        }
    })

    function onMouseMove(e) {
        if (isMouseDown) {
            const drawElement = drawElementRef.current
            selectToolMove({
                drawElement,
                canvasDomElement,
                e,
                lineThickness,
                color,
                startX: mouseX,
                startY: mouseY,
                socket: socketConnection,
            })
        }
    }

    function undo() {
        const drawElement = drawElementRef.current
        if (undoList.length > 0) {
            let dataUrl
        }
    }

    function redo() {}

    return (
        <div className="canvas">
            <canvas
                id="canvas"
                width="1000px"
                height="700px"
                className="canvasBorder"
                ref={canvasDomElement}
                onMouseDown={(e) => mouseDown(e)}
                onMouseUp={() => mouseUp()}
                onMouseMove={(e) => onMouseMove(e)}
            ></canvas>
        </div>
    )
}

export default Canvas
