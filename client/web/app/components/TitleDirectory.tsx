import { Link } from "@remix-run/react";

export default function TitleDirectory({directory}:{directory:Array<String>}) {
    return (<>
        <p className="h-fit">
            {directory.map(
                        (text,i, array)=>
                            <><span key={i}>
                              {(i !== 0)? <span className="text-app-w-write-ash"> / </span>:<></>}
                              {(i !== array.length -1)? <Link to={array.slice(0,i+1).join("/")}>{text}</Link>:<span className="text-app-w-primary">{text}</span>}
                            </span></>)}
        </p>
    </>)
}