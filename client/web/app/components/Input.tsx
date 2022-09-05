export default function Input({title, value, type, name, errMsj, onChange}:{title:string, value:any, type: string, name: string, errMsj: String | undefined | null, onChange?:Function}) {

    return (<div className="flex flex-col mt-2">
        <label className="text-[0.8rem]">{title}</label>
        <input type={type} value={value} className="border-app-w-write-gris border-solid border-2 px-2 py-1 rounded" name={name} aria-invalid={errMsj? true:undefined} aria-details={name+"-error"} 
            onChange={event=>{
                if(onChange)
                    onChange(event.target.value)
            }} ></input>
        {(errMsj)?
            <span id={name+"-error"} className="text-[0.7rem] text-[#EF233C]">{errMsj}</span>:
            <></>}
    </div>)
}