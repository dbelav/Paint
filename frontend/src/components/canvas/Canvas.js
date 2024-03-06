import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { switchMouseClick, setMouseX, setMouseY } from '../tools/toolsSlice'
import useSelectTool from '../../hooks/useSelectTool'
import { useParams } from 'react-router-dom'

import './canvas.scss'


const socketConnection = new WebSocket('ws://localhost:5000')

const Canvas = () => {
    const dispatch = useDispatch()

    const canvasDomElement = useRef(null)
    const drawElementRef = useRef(null)
    const [websocketTool, setWebsocketTool] = useState('pencil')
    const params = useParams()

    const { isMouseDown } = useSelector((state) => state.toolsState)
    const { mouseX } = useSelector((state) => state.toolsState)
    const { mouseY } = useSelector((state) => state.toolsState)
    const { selectedTool } = useSelector((state) => state.toolsState)
    const { lineThickness } = useSelector((state) => state.toolsState)
    const { color } = useSelector((state) => state.toolsState)
    const { username } = useSelector((state) => state.canvasState)
    const { selectToolDown, selectToolMove } = useSelectTool(selectedTool) // for user drawing
    const websocketSelectTool = useSelectTool(websocketTool) // for websocket drawing

    useEffect(() => {
        drawElementRef.current = canvasDomElement.current.getContext('2d')
    }, [])

    useEffect(() => {
        if (username) {
            socketConnection.send(
                JSON.stringify({
                    id: params.id,
                    username,
                    method: 'connection',
                })
            )
        }
    }, [username, socketConnection])

    function mouseDown(e) {
        dispatch(switchMouseClick(true))
        dispatch(setMouseX(e.nativeEvent.offsetX))
        dispatch(setMouseY(e.nativeEvent.offsetY))

        selectToolDown({
            drawElement: drawElementRef.current,
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
        socketConnection.onmessage = (e) => {
            const data = JSON.parse(e.data)
            if (data.username != username) {

                switch (data.method) {
                    case 'connection':
                        console.log('Connected: ' + data.username)
                        break

                    case 'downDraw':
                        setWebsocketTool(data.tool)
                        websocketSelectTool.selectToolDown({
                            drawElement: drawElementRef.current,
                            canvasDomElement: canvasDomElement,
                            e: null,
                            lineThickness: data.lineThickness,
                            color: data.color,
                            startX: data.startX,
                            startY: data.startY,
                            x: data.x,
                            y: data.y,
                        })
                        break

                    case 'moveDraw':
                        websocketSelectTool.selectToolMove({
                            drawElement: drawElementRef.current,
                            canvasDomElement: canvasDomElement,
                            e: null,
                            lineThickness: data.lineThickness,
                            color: data.color,
                            startX: data.startX,
                            startY: data.startY,
                            x: data.x,
                            y: data.y,
                        })
                        break
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
