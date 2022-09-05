
import { json, LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import ManagerBar from "~/components/ManagerBar";
import ScreenCatch from "~/components/ScreenCatch";
import Table, { column } from "~/components/Table";
import { listWorkTeam, WorkTeamModel } from "~/server/workteam.server";

export const loader: LoaderFunction =async ({params,request}) => {
    let workTeam: WorkTeamModel[];
    try {
        workTeam = await listWorkTeam();
        console.log(workTeam);
    } catch (error) {
        throw new Response("Upps! No es posible conectarse al servicio por el momento", { status: 400 });
    }
    return json({data:workTeam})
}

export function CatchBoundary() {
    const {data, status} = useCatch();
    return (
      <ScreenCatch data={data} status={status}></ScreenCatch>
    );
}



export default function WorkTeamAdmin() {
    const {data} = useLoaderData() as {data:WorkTeamModel[]};
    const [workTeam, setWorkTeam] = useState(data);
    const [activedDeletedOption, setActivedDeletedOption] = useState(false);
    const [columns, setColumns] = useState([
        {key:"code", name:"codigo"},
        {key:"encargado", name:"encargado", callBack:(obj:WorkTeamModel)=><><p>{obj.employees.filter((e)=>(e.user.rol.id === 1)).pop()?.name}</p></>},
        {key:"cuadrillla", name:"cuadrilla", callBack:(obj:WorkTeamModel)=><><div className="flex -space-x-4">{obj.employees.map((e)=><><div className="hover:relative hover:z-10 h-8 w-8 bg-app-w-secodary rounded-full flex justify-center items-center border-2 border-app-w-write text-[0.6rem]"><span>{`${e.name.charAt(0)} ${e.lastname.charAt(0)}`}</span></div></>)}</div></>},
        ].map(o=>({...o,on:true})));
    let navigate = useNavigate();
    const editWorkTeam = (id:string) =>{
        navigate("./"+id+"/edit");
    }

    const removeWorkTeam = (id:string) =>{
        navigate("./");
    }

    return (<>
        <div className="px-2 pt-4 md:px-4">
            <div className="text-2xl">
                <h1>Administrador de Equipos de Trabajo</h1>
            </div>
            <ManagerBar onAddClick={"./add"} onDelateClick={()=>{setActivedDeletedOption(!activedDeletedOption)}} onMassiveClick={()=>{}} columns={columns} setColumns={setColumns}></ManagerBar>
            <div className="relative">
                <Table row={10}
                    colums={columns} 
                    bts={(activedDeletedOption)?[{
                        btn:(<><svg width="16" className="fill-current" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21927L15.74 3.59283V3.59283Z" fill="inherit"/></svg></>),
                        action:editWorkTeam, 
                        key:"id"},{
                        btn:(<><svg width="15" className="fill-current" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.25921 16C1.8864 16 1.56952 15.8704 1.30855 15.6111C1.04759 15.3519 0.917105 15.037 0.917105 14.6667V2H0V0.666667H4.20526V0H10.1105V0.666667H14.3158V2H13.3987V14.6667C13.3987 15.0222 13.2645 15.3333 12.9961 15.6C12.7276 15.8667 12.4145 16 12.0566 16H2.25921ZM12.0566 2H2.25921V14.6667H12.0566V2ZM4.63026 12.7556H5.97237V3.88889H4.63026V12.7556ZM8.34342 12.7556H9.68553V3.88889H8.34342V12.7556ZM2.25921 2V14.6667V2Z" fill="inherit"/>
                        </svg></>),
                        action:removeWorkTeam, 
                        key:"id"}]:[{
                        btn:(<><svg width="16" className="fill-current" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21927L15.74 3.59283V3.59283Z" fill="inherit"/>
                            </svg></>),
                        action:editWorkTeam, 
                        key:"id"}]}
                    data={workTeam}
                    ></Table>
            </div>
            
        </div>
    </>)
}
