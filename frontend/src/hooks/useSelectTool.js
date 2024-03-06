import { pencilDown, pencilMove } from '../toolsitem/pencil'
import { circleDown, circleMove } from '../toolsitem/circle'
import { lineDown, lineMove } from '../toolsitem/line'
import { rectDown, rectMove } from '../toolsitem/rect'
import { eraserMove } from '../toolsitem/eraser'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const useSelectTool = (tool) => {

    const { username } = useSelector((state) => state.canvasState)
    const params = useParams()

    function selectToolDown(objectArgs) {

        if(objectArgs.socket){

            objectArgs.socket.send(
                JSON.stringify({
                    username,
                    id: params.id,
                    method: 'downDraw',
                    tool,
                    color: objectArgs.color,
                    lineThickness: objectArgs.lineThickness,
                    startX: objectArgs.startX,
                    startY: objectArgs.startY,
                    x: objectArgs.e.nativeEvent.offsetX,
                    y: objectArgs.e.nativeEvent.offsetY,
                })
            )
        }
 
        switch (tool) {
            case 'pencil':
                pencilDown(objectArgs)
                break
            case 'circle':
                circleDown(objectArgs.canvasDomElement)
                break
            case 'line':
                lineDown(objectArgs)
            case 'rect':
                rectDown(objectArgs.canvasDomElement)
                break
        }
    }

    function selectToolMove(objectArgs) {
        
        if(objectArgs.socket){
            
            objectArgs.socket.send(
                JSON.stringify({
                    username,
                    id: params.id,
                    method: 'moveDraw',
                    tool,
                    color: objectArgs.color,
                    lineThickness: objectArgs.lineThickness,
                    startX: objectArgs.startX,
                    startY: objectArgs.startY,
                    x: objectArgs.e.nativeEvent.offsetX,
                    y: objectArgs.e.nativeEvent.offsetY,
                })
            )
        }

        switch (tool) {
            case 'pencil':
                pencilMove(objectArgs)
                break
            case 'circle':
                circleMove(objectArgs)
                break
            case 'line':
                lineMove(objectArgs)
                break
            case 'rect':
                rectMove(objectArgs)
                break
            case 'eraser':
                eraserMove(objectArgs)
                break
        }
    }

    return { selectToolDown, selectToolMove }
}

export default useSelectTool
