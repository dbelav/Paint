import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUsername } from '../canvas/canvasSlice'

import './modalWindow.scss'


function ModalWindow() {

    const [name, setName] = useState('')
    const [modalView, setmodalView] = useState(true)

    const dispatch = useDispatch()

    function setInputValue(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function saveName(e){
        e.preventDefault()
        dispatch(setUsername(name))
        setmodalView((false))
    }

    return (
         modalView && 
         <div className="modalWindow">
            <h1>Enter your name</h1>
            <form>
                <input type='text' onChange={e => setInputValue(e)}/>
                <button onClick={e => saveName(e)}>Save</button>
            </form>
        </div>
    )
}

export default ModalWindow
