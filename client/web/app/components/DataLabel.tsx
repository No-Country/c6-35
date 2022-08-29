export default function DataLabel({text,label, className = ""}:{text:String, label:String, className?:string}) {
    return (<>
        <div className={className}>
            <p className="text-app-w-secodary inline-flex flex-col sm:flex-row border-2 border-app-w-write-back p-2 rounded-md sm:border-0 w-full"><span className="text-app-w-write-ash w-20 min-w-max pr-2 text-[0.7rem] sm:text-base">{label}: </span>{text}</p>
        </div>
    </>)
}