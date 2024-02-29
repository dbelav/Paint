let url

export function circleDown(canvasDomElement) {
    url = canvasDomElement.current.toDataURL()
}

export function circleMove(objectArgs) {
    const {
        drawElement,
        e,
        startX,
        startY,
        canvasDomElement,
        color,
        lineThickness,
        x,
        y,
    } = objectArgs

    let width
    let height

    if (e === null) {
        width = x - startX
        height = y - startY
    } else {
        width = e.nativeEvent.offsetX - startX
        height = e.nativeEvent.offsetY - startY
    }

    let r = Math.sqrt(width ** 2 + height ** 2)

    const img = new Image()
    img.src = url

    img.onload = () => {
        drawElement.clearRect(
            0,
            0,
            drawElement.canvas.width,
            drawElement.canvas.height
        )
        drawElement.drawImage(
            img,
            0,
            0,
            canvasDomElement.current.width,
            canvasDomElement.current.height
        )
        drawElement.beginPath()
        drawElement.arc(startX, startY, r, 0, 2 * Math.PI)
        drawElement.strokeStyle = color
        drawElement.lineWidth = lineThickness
        drawElement.stroke()
    }
}
