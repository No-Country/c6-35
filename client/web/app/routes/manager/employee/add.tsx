import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useOutletContext, useParams } from "@remix-run/react";
import { createEmployee, EmployeeModel } from "~/server/employee.server";
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
    try {
        const data: any  = await createEmployee({
            name: name!,
            lastname:lastname!,
            dni:Number.parseInt(dni!),
            employeeId:parseInt(nrolegajo!),
            phone:parseInt(celular!),
            direccion:direccion!,
            user:{
                userName: user!,
                email:email!,
                password:password!,
                rol:{id:parseInt(rol!)}
            }
        })
        if(data.error)
            throw {error:data.error, status: data.status, message: data.message};
        let newEmployee: EmployeeModel = data;
        return redirect(`/manager/employee/${newEmployee.id!}?created=y`);
    } catch (error:any) {
        console.log(error);
        return json<ActionData>(
            actionData,
            {status:error.status}
        )
    }
}


function Input({title, value, type, name, errMsj}:{title:string, value:any, type: string, name: string, errMsj: String | undefined | null}) {

    return (<div className="flex flex-col mt-2">
        <label className="text-[0.8rem]">{title}</label>
        <input type={type} className="border-app-w-write-gris border-solid border-2 px-2 py-1 rounded" name={name} aria-invalid={errMsj? true:undefined} aria-details={name+"-error"}></input>
        {(errMsj)?
            <span id={name+"-error"} className="text-[0.7rem] text-[#EF233C]">{errMsj}</span>:
            <></>}
    </div>)
}


export default function AddEmployee() {
    const actionData = useActionData() as ActionData;
    

    return (<>
        <div className="p-2 md:px-4">
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
                                <Input title="Nombre" type="text" value="" name="name" errMsj={actionData?.errors?.name}></Input>
                                <Input title="Apelliddo" type="text" value="" name="lastname" errMsj={actionData?.errors?.lastname}></Input>
                            </div>
                            <div className="flex  space-x-2">
                                <div className="w-28"><Input title="DNI" type="text" value="" name="dni" errMsj={actionData?.errors?.dni} ></Input></div>
                                <div className="w-20"><Input title="Nro de legajo" type="text" value="" name="nrolegajo" errMsj={actionData?.errors?.nrolegajo}></Input></div>
                            </div>
                            <div className="flex  space-x-2">
                                <div className="w-28"><Input title="Celular" type="text" value="" name="celular" errMsj={actionData?.errors?.celular}></Input></div>
                                <div className="flex-grow"><Input title="Dirección" type="text" value="" name="direccion" errMsj={actionData?.errors?.direccion}></Input></div>
                            </div>
                        </div>
                        <div>
                            <span className="pl-2">Datos de usuariso</span>
                            <div className="h-0.5 bg-[#EDF2F4] mx-2"></div>
                        </div>
                        <div className="px-2">
                            <div className="flex  space-x-2">
                                <Input title="Nombre de usuario" type="text" value="" name="user" errMsj={actionData?.errors?.user}></Input>
                                <Input title="Correo electronico" type="text" value="" name="email" errMsj={actionData?.errors?.email}></Input>
                            </div>
                            <div className="w-44"><Input title="Contraseña" type="text" value="" name="password" errMsj={actionData?.errors?.password}></Input></div>
                            <Input title="Rol" type="text" value="" name="rol" errMsj={""}></Input>
                        </div>
                    </div>
                    <div className="float-right mt-2"><button>Confirm</button></div>
                </Form>
            </div>
        </div>
    </>)
}