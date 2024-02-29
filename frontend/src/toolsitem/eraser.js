export function eraserMove(objectArgs) {
    const { drawElement, e, x, y } = objectArgs

    drawElement.beginPath()
    if (e === null) {
        drawElement.arc(x, y, 50, 0, 2 * Math.PI)
    } else {
        drawElement.arc(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
            50,
            0,
            2 * Math.PI
        )
    }
    drawElement.fillStyle = '#fff'
    drawElement.fill()
}
