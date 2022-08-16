export interface column{
    name:String,
    key:string
}

export default function Table({colums, data, row=10}:{colums:Array<column>, data:Array<any>, row:number}) {
    let vacio = []
    let rows = [] 
    while ((row - data.length) > vacio.length) {
        vacio.push(null);
    }
    rows.push(...data,...vacio)
    return (<>
    <div className="overflow-x-scroll w-full rounded-md  border-solid border-l-2 border-r-2 border-[#252B42]" style={{scrollbarWidth: "none"}}>
        <table className="w-full ">
            <thead>
                <tr className="bg-[#252B42] text-[#FAFCFD] h-11 text-left" >
                    {colums.map((col,i)=><th key={i} className="px-2 max-w-[300px]">{col.name}</th>)}
                    
                    <th className="sticky right-0 bg-slate-400" style={{
                        background: "linear-gradient(90deg, rgba(2,0,36,0) 0%, #252B42 100%)"}}></th>
                </tr>
            </thead>
            
            <tbody>
                {rows.map((obj, a)=>
                    <tr key={a} className="mr-20 text-[#8D99AE] border-solid border-[#EDF2F4] border-b-[1px] h-10 hover:bg-[#FAFCFD] hover:text-[#FCBA11]">
                        {colums.map((col, i)=><td key={i} className="px-2 text-[#8D99AE]">{(obj !== null)? obj[col.key]: ""}</td>)}
                        
                        {(obj !== null)? <td className="sticky right-0 bg-[#FCFEFF] border-solid border-l-[1px] border-[#EDF2F4] h-full max-w-[34px] min-w-[33px] w-10">
                            <button className="flex h-full content-center justify-center w-full">
                                <svg width="16" className="fill-current" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21927L15.74 3.59283V3.59283Z" fill="inherit"/>
                                </svg>
                            </button>
                        </td>: <td></td>}
                    </tr>)}
            </tbody>
            
        </table>
    </div>
    </>)
}