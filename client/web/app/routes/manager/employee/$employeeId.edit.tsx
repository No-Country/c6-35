import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useCatch, useLoaderData, useOutletContext, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import ScreenCatch from "~/components/ScreenCatch";
import TitleDirectory from "~/components/TitleDirectory";
import { createEmployee, EmployeeModel, getEmployeeWhitId } from "~/server/employee.server";
import { validateName, validateDNI, validateNroLegajo, validatePhone, validateEmail, validatePassword} from "~/utils/validate";
import Employee from "../employee";


interface Errors {
    name?: string;
    lastname?: string;
    dni?: string;
    nrolegajo?: string;
    celular?: string;
    direccion?: string;
    email?: string;
    user?:string;
    password?:string;
    rol?:number;
}

interface ActionData {
    errors?: Errors
}
export const loader: LoaderFunction =async ({params}) => {
    const {employeeId} = params;
    let employee: EmployeeModel;
    if(employeeId === "-11"){
        employee = {id: 0, dni:"123333", name:"Diego", lastname:"Noblega", phone:2333223, employeeId:2333,direccion:"", user:{email:"diego2212@gmail.com", userName:"diegoNoble", rol:{id:2}, password:"dwdwd"}}
        return json(employee)
    }
    try {
        let data:any = await getEmployeeWhitId(employeeId);
        if(data.error)
            throw {error:data.error, status: data.status, message: data.message};
        employee = data;
        return json({data:employee})
    } catch (error) {
        throw new Response("No encontrado", { status: 404 });
    }
}

export const action: ActionFunction =async ({params, request}) => {
    const form = await request.formData()

    const name = form.get("name")?.toString();
    const lastname = form.get("lastname")?.toString();
    const dni = form.get("dni")?.toString();
    const nrolegajo = form.get("nrolegajo")?.toString(); 
    const celular = form.get("celular")?.toString();
    const direccion = form.get("direccion")?.toString();
    const user = form.get("user")?.toString();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const rol = form.get("rol")?.toString();
    console.log(name)
    let errors:Errors = {};
    let actionData: ActionData = {errors};
    let isErrors = false;
    const validate = (validate:CallableFunction, msjErr:Errors)=>{
        if(!validate()){ errors = {...errors, ...msjErr}; isErrors = true};
    };

    validate(validateName.bind(null, name!),{name:"nombre invalido"});
    validate(validateName.bind(null, lastname!),{lastname:"apellido invalido"});
    validate(validateDNI.bind(null, dni!),{dni:"dni invalido"});
    validate(validateNroLegajo.bind(null, nrolegajo!),{nrolegajo:"numero de legajo invalido"});
    validate(validatePhone.bind(null, celular!),{celular:"numero de celular invalido"});
    validate(validateName.bind(null, user!),{user:"usuario no valido"});
    validate(validateEmail.bind(null, email!),{email:"correo electronico invalido"});
    validate(validatePassword.bind(null, password!),{password:"contraseña demasiado debil"});
    actionData.errors = errors;
    if(isErrors)
        return json<ActionData>(
            actionData,
            {status:400}
        )
    
    const newEmployee: EmployeeModel  = await createEmployee({
        name: name!,
        lastname:lastname!,
        dni:dni!,
        employeeId:parseInt(nrolegajo!),
        phone:parseInt(celular!),
        direccion:"",
        user:{
            userName: user!,
            email:email!,
            password:password!,
            rol:{id:parseInt(rol!)}
        }
    })
    return redirect(`/employee/${newEmployee.id!}`);
}


function Input({title, value, type, name, errMsj, onChange}:{title:string, value:any, type: string, name: string, errMsj: String | undefined | null, onChange?:Function}) {

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

export function CatchBoundary() {
    const caught = useCatch();
    const data = caught.data;
    return (
      <ScreenCatch data={data} status={caught.status}></ScreenCatch>
    );
  }

export default function EditEmployee() {
    const {data:employee} = useLoaderData() as {data:EmployeeModel};
    const [data, setData] = useState(employee);
    const actionData = useActionData() as ActionData;
    console.log(data)
    const handle = (callBack:(data:EmployeeModel, value:any)=>void)=>{
        return (value:any)=>{
            let d = {...data};
            callBack(d, value);
            setData(d);
        }
    }


    return (<>
        <div className="p-2 ">
            <div className="text-2xl mb-2">
                <h1>Alta de empleado</h1>
            </div>
            <div className="mx-2"></div>
            <div className="mt-6 xl:w-1/2 ml-auto mr-auto space-y-4">
                <Form method="post">
                    <div className="flex flex-col p-4 border-solid border border-app-w-write-ash bg-app-w-write rounded-md">
                        <div>
                            <span className="pl-2">Datos Basicos</span>
                            <div className="h-0.5 bg-[#EDF2F4] mx-2"></div>
                        </div>
                        <div className="px-2">
                            <div className="flex space-x-2 flex-wrap">
                                <Input title="Nombre" type="text" value={data.name} name="name" errMsj={actionData?.errors?.name} onChange={handle((data,value)=>{data.name = value})}></Input>
                                <Input title="Apelliddo" type="text" value={data.lastname} name="lastname" errMsj={actionData?.errors?.lastname} onChange={handle((data,value)=>{data.lastname = value})}></Input>
                            </div>
                            <div className="flex  space-x-2">
                                <div className="w-28"><Input title="DNI" type="text" value={data.dni} name="dni" errMsj={actionData?.errors?.dni} onChange={handle((data,value)=>{data.dni = value})}></Input></div>
                                <div className="w-20"><Input title="Nro de legajo" type="text" value={data.employeeId} name="nrolegajo" errMsj={actionData?.errors?.nrolegajo}  onChange={handle((data,value)=>{data.employeeId = value})}></Input></div>
                            </div>
                            <div className="flex  space-x-2">
                                <div className="w-28"><Input title="Celular" type="text" value={data.phone} name="celular" errMsj={actionData?.errors?.celular} onChange={handle((data,value)=>{data.phone = value})}></Input></div>
                                <div className="flex-grow"><Input title="Dirección" type="text" value={data.direccion} name="direccion" errMsj={actionData?.errors?.direccion} onChange={handle((data,value)=>{data.direccion = value})}></Input></div>
                            </div>
                        </div>
                        <div>
                            <span className="pl-2">Datos de usuariso</span>
                            <div className="h-0.5 bg-[#EDF2F4] mx-2"></div>
                        </div>
                        <div className="px-2">
                            <div className="flex  space-x-2">
                                <Input title="Nombre de usuario" type="text" value={data.user.userName} name="user" errMsj={actionData?.errors?.user} onChange={handle((data,value)=>{data.user.userName = value})}></Input>
                                <Input title="Correo electronico" type="text" value={data.user.email} name="email" errMsj={actionData?.errors?.email} onChange={handle((data,value)=>{data.user.email = value})}></Input>
                            </div>
                            <div className="w-44"><Input title="Contraseña" type="text" value={""} name="password" errMsj={actionData?.errors?.password} onChange={handle((data,value)=>{data.user.password = value})}></Input></div>
                            <Input title="Rol" type="text" value="" name="rol" errMsj={""} onChange={handle((data,value)=>{data.user.rol.id = value})}></Input>
                        </div>
                    </div>
                    <div className="float-right mt-2"><button>Confirm</button></div>
                </Form>
            </div>
        </div>
    </>)
}