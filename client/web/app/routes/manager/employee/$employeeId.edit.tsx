import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useCatch, useLoaderData, useSubmit } from "@remix-run/react";
import { useRef, useState } from "react";
import Input from "~/components/Input";
import ScreenCatch from "~/components/ScreenCatch";
import { EmployeeModel, getEmployeeWhitId, updateEmployee } from "~/server/employee.server";
import { validateName, validateDNI, validateNroLegajo, validatePhone, validateEmail, validatePassword} from "~/utils/validate";


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
        employee = {id: 0, dni:12333322, name:"Diego", lastname:"Noblega", phone:2333223, employeeId:2333,direccion:"", user:{email:"diego2212@gmail.com", userName:"diegoNoble", rol:{id:2}, password:"dwdwd"}}
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
    const id = form.get("id")?.toString();
    const name = form.get("name")?.toString();
    const lastname = form.get("lastname")?.toString();
    const dni = form.get("dni")?.toString();
    const nrolegajo = form.get("nrolegajo")?.toString(); 
    const celular = form.get("celular")?.toString();
    const direccion = form.get("direccion")?.toString();
    const userId = form.get("userId")?.toString();
    const user = form.get("user")?.toString();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const rol = form.get("rol")?.toString();
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
    actionData.errors = errors;
    if(isErrors)
        return json<ActionData>(
            actionData,
            {status:400}
        )
    
    const newEmployee: EmployeeModel  = await updateEmployee({
        id:Number.parseInt(id!),
        name: name!,
        lastname:lastname!,
        dni:Number.parseInt(dni!),
        employeeId:parseInt(nrolegajo!),
        phone:parseInt(celular!),
        direccion:direccion!,
        user:{
            id:Number.parseInt(userId!),
            userName: user!,
            email:email!,
            password:password!,
            rol:{id:parseInt(rol!)}
        }
    },  Number.parseInt(id!))
    return redirect(`/employee/${newEmployee.id!}`);
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
    const formRef = useRef<HTMLFormElement>(null);
    const submit = useSubmit();
    function handleSubmit(event:any) {
        let formData = new FormData(formRef.current!)
        formData.set("id", data.id!.toString());
        formData.set("userId", data.user.id!.toString());
        submit(formData, {method:"post", action:event.target.action});
        event.preventDefault();
    }

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
                <Form method="post" ref={formRef} onSubmit={handleSubmit}>
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
                            <Input title="Rol" type="text" value={data.user.rol.id} name="rol" errMsj={""} onChange={handle((data,value)=>{data.user.rol.id = value})}></Input>
                        </div>
                    </div>
                    <div className="float-right mt-2"><button>Confirm</button></div>
                </Form>
            </div>
        </div>
    </>)
}