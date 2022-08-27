import { ErrorBoundaryComponent, json, LoaderFunction, Response } from "@remix-run/node";
import { useCatch, useLoaderData, useOutletContext, useParams } from "@remix-run/react"
import { useEffect, useState } from "react";
import DataLabel from "~/components/DataLabel";
import ScreenCatch from "~/components/ScreenCatch";
import { EmployeeModel, getEmployeeWhitId } from "~/server/employee.server";


export const loader: LoaderFunction =async ({params,request}) => {
    const url = new URL(request.url);
    const created = url.searchParams.get("created");
    const {employeeId} = params;
    let employee: EmployeeModel;
    if(employeeId === "-11"){
        employee = {id: 0, dni:"123333", name:"Diego", lastname:"Noblega", phone:2333223, employeeId:2333, direccion:"", user:{email:"diego2212@gmail.com", userName:"diegoNoble", rol:{id:2}, password:"dwdwd"}}
        return json({data:employee, created})
    }
    try {
        let data:any = await getEmployeeWhitId(employeeId);
        console.log(data)
        console.log("hola")
        if(data.error)
            throw {error:data.error, status: data.status, message: data.message};
        employee = data;
        return json({data:employee, created})
    } catch (error) {
        console.log(error)
        let e:any = error;
        throw new Response(e.error, { status: e.status });
    }
    
}

export function CatchBoundary() {
    const {data, status} = useCatch();
    return (
      <ScreenCatch data={data} status={status}></ScreenCatch>
    );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({error}) => {
    return (<>
    <div className="h-screen bg-app-msj-danger text-app-w-write flex flex-col justify-center items-center">
        <span className="">{error.message}</span>
    </div></>)
 }




export default function EmployeeId() {
    const {data:employee, created} = useLoaderData() as {data:EmployeeModel, created:string};
    
    return (<>
        {(created)?<div className="p-2 bg-app-msj-accepted-pale flex">
                <div className="w-1 rounded-sm bg-app-msj-accepted"></div>
                <span className="ml-2">Empleado creado con exito</span>
        </div>:<></>}
        <div className="m-2">
            <div className="text-2xl mb-2">
                <h1>Panel de usuario - {employee.name} {employee.lastname}</h1>
            </div>
            <div className="bg-app-w-write border border-solid border-app-w-write-ash rounded-md p-4 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 overflow-hidden">
                <div className="flex flex-col space-y-4">
                    <div className="flex sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4">
                        <DataLabel label={"Nombre"} text={employee.name}></DataLabel>
                        <DataLabel label={"Apellido"} text={employee.lastname}></DataLabel>
                        <DataLabel label={"Legajo"} text={employee.employeeId.toString()}></DataLabel>
                    </div>
                    <DataLabel label={"DNI"} text={employee.dni} className="w-full"></DataLabel>
                </div>
                <div className="bg-app-w-primary px-[1px] py-[1px] rounded-full"></div>
                <div className="flex flex-col space-y-4">
                    <DataLabel label={"Usuario"} text={employee.user.userName}></DataLabel>
                    <DataLabel label={"Correo Electronico"} text={employee.user.email}></DataLabel>
                    
                </div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    </>)
}