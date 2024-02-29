import { useSelector, useDispatch } from "react-redux";
import { setTool, setColor, setLineThickness } from "./toolsSlice";

import "./tools.scss";

const Tools = () => {

    const dispatch = useDispatch();

    const { color } = useSelector((state) => state.toolsState)
    const { lineThickness } = useSelector((state) => state.toolsState)

    const handleColorChange = (e) => {
        dispatch(setColor(e.target.value))
    }

    const handleLineThicknessChange = (e) => {
        dispatch(setLineThickness(e.target.value))
    };

    return (
        <div className="tools">
            <div className="toolsTop">
                <div className="toolsTopLeft">
                    <button 
                    className="toolItem pencil"
                    onClick={() => dispatch(setTool('pencil'))}
                    ></button>

                    <button 
                    className="toolItem rect"
                    onClick={() => dispatch(setTool('rect'))}
                    ></button>

                    <button 
                    className="toolItem circle"
                    onClick={() => dispatch(setTool('circle'))}
                    ></button>

                    <button 
                    className="toolItem eraser"
                    onClick={() => dispatch(setTool('eraser'))}
                    ></button>

                    <button className="toolItem line"
                    onClick={() => dispatch(setTool('line'))}
                    ></button>

                    <input className="rgb" type="color" 
                    value={color}
                    onChange={handleColorChange}
                    ></input>
                </div>
                <div className="toolsTopRight">
                    <button className="toolItem undo"></button>
                    <button className="toolItem redo"></button>
                    <button className="toolItem save"></button>
                </div>
            </div>
            <div className="toolsBottom">
				<span className="toolsBottomTitle">Line thickness</span>
				<input 
                type="text" 
                className="toolsBottomInput"
                value={lineThickness}
                onChange={handleLineThicknessChange}
                />
			</div>
        </div>
    );
};

export default Tools;
