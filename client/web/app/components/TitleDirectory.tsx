
export default function TitleDirectory({directory}:{directory:Array<String>}) {
    return (<>
        <h1 className="text-2xl">
            {directory.map(
                        (text,i, array)=>
                            <>{(i !== 0)? <span className="text-[#8D99AE]"> / </span>:<></>}
                              {(i !== array.length -1)? <span>{text}</span>:<span className="text-[#FCBA11]">{text}</span>}
                            </>)}
        </h1>
    </>)
}