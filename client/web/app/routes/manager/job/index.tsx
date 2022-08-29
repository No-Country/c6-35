
import { json, LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import ManagerBar from "~/components/ManagerBar";
import ScreenCatch from "~/components/ScreenCatch";
import Table from "~/components/Table";
import { EmployeeModel, listEmployee } from "~/server/employee.server";

export const loader: LoaderFunction =async ({params,request}) => {
    console.log(process.env.SERVER_URL)
    const url = new URL(request.url);
    const created = url.searchParams.get("created");
    const {employeeId} = params;
    let employees: EmployeeModel[];
    try {
        employees = await listEmployee();
    } catch (error) {
        console.log(error)
        throw new Response("Upps! No es posible conectarse al servicio por el momento", { status: 400 });
    }
    return json({data:employees, created})
}

export function CatchBoundary() {
    const {data, status} = useCatch();
    return (
      <ScreenCatch data={data} status={status}></ScreenCatch>
    );
}

export default function JobAdmin() {
    const {data} = useLoaderData() as {data:EmployeeModel[]};
    const [employees, setEmployees] = useState(data);
    let navigate = useNavigate();
    const editEmployee = (id:string) =>{
        navigate("./"+id+"/edit");
    }

    return (<>
        <div className="px-2 pt-4 md:px-4">
            <div className="text-2xl">
                <h1>Administrador de Ordenes de trabajo</h1>
            </div>
            <ManagerBar onAddClick={"./add"} onDelateClick={()=>{}} onEditColumnsClick={()=>{}} onMassiveClick={()=>{}}></ManagerBar>
            <div className="relative">
                <Table row={10}
                    colums={[
                    {key:"code", name:"legajo"},
                    {key:"name", name:"nombre"},
                    {key:"lastname", name:"apellido"},
                    {key:"dni", name:"DNI"},
                    {key:"phone", name:"celular"},
                    {key:"direccion", name:"dirección"}]} 
                    bts={[{
                        btn:(<><svg width="16" className="fill-current" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21927L15.74 3.59283V3.59283Z" fill="inherit"/>
                            </svg></>),
                        action:editEmployee, 
                        key:"id"}]}
                    data={employees}
                    
                    ></Table>
            </div>
        </div>
    </>)
}
