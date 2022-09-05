import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useOutletContext, useParams, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import Button, { TypeButton } from "~/components/Button";
import Input from "~/components/Input";
import Table from "~/components/Table";
import { createEmployee, EmployeeModel, listEmployee, updateEmployee } from "~/server/employee.server";
import { createWorkTeam, getWorkTeamWhitId, updateWorkTeam, WorkTeamModel } from "~/server/workteam.server";


interface Errors {
    code?: string;
}

interface ActionData {
    errors?: Errors
  }

export const loader: LoaderFunction =async ({params,request}) => {
    const {workteamId} = params;
    let workTeam: WorkTeamModel;
    let employees: EmployeeModel[];
    try {
        workTeam = await getWorkTeamWhitId(workteamId);
        employees = await listEmployee();
    } catch (error) {
        throw new Response("Upps! No es posible conectarse al servicio por el momento", { status: 400 });
    }
    return json({data:{workTeam,employees}, type:"list"})
}

export const action: ActionFunction =async ({params, request}) => {
    const form = await request.formData();
    let id = form.get("id")?.toString();
    const employees = JSON.parse(form.get("employees")?.toString()!) as number[]
    console.log(await updateWorkTeam({
        employees: employees.map((n)=>({id:n})) as EmployeeModel[],
        code: form.get("code")?.toString()!,
        jobs: []
    },Number.parseInt(id!)))
    return json({})
}


export default function EditWorkTeam() {
    const actionData = useActionData() as ActionData;
    const {data, type} = useLoaderData() as {data:{employees:EmployeeModel[], workTeam:WorkTeamModel}, type:string};
    const [employees, setEmployees] = useState<EmployeeModel[]>(data.employees);
    const [employeesSelected, setEmployeesSelected] = useState<EmployeeModel[]>(data.workTeam.employees);
    const [code, setCode] = useState<string>(data.workTeam.code);
    const formRef = useRef<HTMLFormElement>(null);
    const submit = useSubmit();

    useEffect(()=>{
        setEmployees(employees.filter((e)=>(employeesSelected.find((i)=>(e.id === i.id)))?false:true))
    },[employeesSelected])


    function handleSubmit(event:any) {
        let formData = new FormData(formRef.current!)
        formData.set("employees",JSON.stringify(employeesSelected.map((e)=>e.id)));
        formData.set("id",data.workTeam.id?.toString()!);
        submit(formData, {method:"post", action:event.target.action});
        event.preventDefault();
    }

    function asignarEmployeeHandle(id:any) {
        //encontrar el empleado
        let employeeFilter = employees.filter((e)=> e.id! === id!).pop();
        let employeesFilters = employees.filter((e)=>!(e.id! === id!));
        setEmployees([...employeesFilters])
        setEmployeesSelected([...employeesSelected, employeeFilter!])
    }

    function removerEmployeeHandle(id:any) {
        //filtrar el empleado
        let employeeFilters = employeesSelected.filter((e)=>!(e.id! === id!));
        setEmployeesSelected([...employeeFilters])
    }

    function onChangeJefeHandle(id:any) {
        //filtrar el empleado
        let employeeFilters = employeesSelected.map((employee:any)=>({...employee, jefe:(employee.id === id)? ((employee.jefe)?!employee.jefe:true):false }) );
        setEmployeesSelected([...employeeFilters])
    }

    return (<>
        <div className="p-2 md:px-6 min-h-screen">
            <div className="text-2xl mb-2">
                <h1>Alta de equipo</h1>
            </div>
            <div className="mx-2"></div>
            <div className="mt-6 space-y-4">
                <Form method="post" ref={formRef} onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col p-4 border-solid border border-app-w-write-ash bg-app-w-write rounded-md">
                    <div className="space-y-4 flex flex-col">
                        <Input name="code" value={code} title="Codigo de equipo" errMsj={""} type="number" onChange={(v:any)=>{setCode(v)}}></Input>
                        <div>
                            <span>Integrantes</span>
                            <Table 
                            colums={[{key:"master", name:"jefe", on:true, callBack:(obj)=><input type={"checkbox"} name="jefe" value={obj.id} checked={obj.jefe} onChange={(e)=>{onChangeJefeHandle(obj.id)}}></input>},{key:"employeeId",name:"legajo",on:true}, {key:"name",name:"nombre",on:true}, {key:"lastname",name:"apellido",on:true}]}
                            data={employeesSelected.map((e:any)=>({...e, jefe:(e.jefe)?e.jefe:false}))}
                            row={(employeesSelected.length > 0)? employeesSelected.length:1}
                            bts={[{
                                key:"id",
                                action:removerEmployeeHandle,
                                btn:<><svg width="16" className="fill-current" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21927L15.74 3.59283V3.59283Z" fill="inherit"/></svg></>}]}
                            ></Table>
                        </div>
                    </div>
                    </div>
                    <div className="mt-2"><Button onClick={()=>{}} text={"Confirm"} type={TypeButton.Confirm}></Button></div>
                </Form>
                <div>
                    <span>Empleados disponibles</span>
                    <Table 
                        colums={[{key:"employeeId",name:"legajo",on:true}, {key:"name",name:"nombre",on:true}, {key:"lastname",name:"apellido",on:true}]}
                        data={employees}
                        row={(employees.length > 0)? employees.length:0}
                        bts={[{
                            key:"id",
                            action:asignarEmployeeHandle,
                            btn:<><svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6.29998 11.9L2.56665 8.16665L3.28332 7.44998L6.29998 10.4667L12.7 4.06665L13.4166 4.78332L6.29998 11.9Z"/></svg></>}]}
                    ></Table>
                </div>
            </div>
        </div>
    </>)
}