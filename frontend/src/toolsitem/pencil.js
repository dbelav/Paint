export function pencilDown(objectArgs) {
    const { drawElement, e, lineThickness, color, x, y } = objectArgs

    drawElement.beginPath()
    if (e === null) {
        drawElement.moveTo(x, y)
    } else {
        drawElement.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    }
    drawElement.lineWidth = lineThickness
    drawElement.strokeStyle = color
}

export function pencilMove(objectArgs) {
    const { e, drawElement, x, y } = objectArgs
    
    if (e === null) {
        drawElement.lineTo(x, y)
    } else {
        drawElement.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    }
    drawElement.stroke()
}
