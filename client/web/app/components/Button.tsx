import { Link } from "react-router-dom"

export default function Button({text, type="default", onClick}:{text:String, type:string, onClick:Function|string}) {
    let buttons:any = {
        "confirm": `bg-[#FFC737] border-[#FCBA11] border-solid border-[1px] text-white rounded px-3 py-3 sm:py-0.5 text-[0.8rem] w-full block text-center`,
        "cansel": `bg-[#FF5761] border-[#FF0000] border-solid border-[1px] text-white rounded px-3 py-3 sm:py-0.5 text-[0.8rem] w-full block text-center`,
        "default": `bg-[#FBFBFB] border-[#F2F2F2] border-solid border-[1px] text-[#252B42] rounded px-3 py-3 sm:py-0.5  text-[0.8rem] w-full block text-center`}
    
    
    return (<>
        {(typeof onClick === "function")? <button onClick={()=>{onClick()}} className={buttons[type]}>{text}</button>:<Link to={onClick} className={buttons[type]}>{text}</Link>}
    </>)
    
}