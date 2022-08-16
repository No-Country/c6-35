export default function Button({text, type="default"}:{text:String, type:string, onClick:Function}) {
    let buttons:any = {
        "confirm": <button onClick={()=>onclick} className={`bg-[#FFC737] border-[#FCBA11] border-solid border-[1px] text-white rounded px-3 py-0.5 text-[0.8rem] w-full`}>{text}</button>,
        "cansel": <button onClick={()=>onclick}  className={`bg-[#FF5761] border-[#FF0000] border-solid border-[1px] text-white rounded px-3 py-0.5 text-[0.8rem] w-full`}>{text}</button>,
        "default": <button onClick={()=>onclick}  className={`bg-[#FBFBFB] border-[#F2F2F2] border-solid border-[1px] text-[#252B42] rounded px-3 py-0.5  text-[0.8rem] w-full`}>{text}</button>}

    
    return (<>
        {buttons[type]}
    </>)
    
}