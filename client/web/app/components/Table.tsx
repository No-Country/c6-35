export interface column{
    name:String,
    key:string
}

export default function Table({colums, data, row=10, bts}:{colums:Array<column>, data:Array<any>, row:number, bts:{btn:JSX.Element,action: Function, key:string}[]}) {
    let vacio = []
    let rows = [] 
    while ((row - data.length) > vacio.length) {
        vacio.push(null);
    }
    rows.push(...data,...vacio)
    return (<>
    <div className="overflow-x-scroll w-full rounded-md  border-solid border-l-2 border-r-2 border-app-w-secodary" style={{scrollbarWidth: "none"}}>
        <table className="w-full ">
            <thead>
                <tr className="bg-app-w-secodary text-app-w-write-gris h-11 text-left" >
                    {colums.map((col,i)=><th key={i} className="px-2 max-w-[300px]">{col.name}</th>)}
                    
                    <th className="sticky right-0 bg-slate-400" style={{
                        background: "linear-gradient(90deg, rgba(2,0,36,0) 0%, #252B42 100%)"}}></th>
                </tr>
            </thead>
            
            <tbody>
                {rows.map((obj, a)=>
                    <tr key={a} className="mr-20 text-app-w-write-ash border-solid border-[#EDF2F4] border-b-[1px] h-10 bg-app-w-write hover:bg-[#FAFCFD] hover:text-app-w-primary">
                        {colums.map((col, i)=><td key={i} className="px-2 text-app-w-write-ash">{(obj !== null)? obj[col.key]: ""}</td>)}
                        
                        {(obj !== null)? <td className="sticky right-0 bg-app-w-write-gris border-solid border-l-[1px] border-app-w-write-back h-full min-w-[33px] w-10">
                            <div className="flex h-full px-2 space-x-4">
                                {bts.map((btn, i)=>{
                                    return <button key={i} onClick={()=>{btn.action(obj[btn.key])}}>{btn.btn}</button>
                                })}
                            </div>
                        </td> : <td></td>}
                    </tr>)}
            </tbody>
            
        </table>
    </div>
    </>)
}