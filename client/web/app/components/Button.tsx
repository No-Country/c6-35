import { Link } from "react-router-dom"

export enum TypeButton {
    Confirm,
    Cansel,
    Default
}

export default function Button({text, type=TypeButton.Default, onClick}:{text:String, type:TypeButton, onClick:Function|string}) {
    let buttons:any = {
        0 : `bg-[#FFC737] border-[#FCBA11] border-solid border-[1px] text-white rounded px-3 py-3 sm:py-0.5 text-[0.8rem] w-full block text-center`,
        1 : `bg-[#FF5761] border-[#FF0000] border-solid border-[1px] text-white rounded px-3 py-3 sm:py-0.5 text-[0.8rem] w-full block text-center`,
        2 : `bg-[#FBFBFB] border-[#F2F2F2] border-solid border-[1px] text-[#252B42] rounded px-3 py-3 sm:py-0.5  text-[0.8rem] w-full block text-center`}
    
    
    return (<>
        {(typeof onClick === "function")? <button onClick={()=>{onClick()}} className={buttons[type]}>{text}</button>:<Link to={onClick} className={buttons[type]}>{text}</Link>}
    </>)
    
}