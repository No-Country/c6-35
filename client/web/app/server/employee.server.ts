import {z} from "zod";

export const RolSchema = z.object({
    id: z.number().min(0,"id mayor a 0")
})

export const UserSchema = z.object({
    id: z.number().min(0,"id mayor a 0").optional(),
    userName: z.string().regex(/^[a-zA-Z]+(([',.-][a-zA-Z])?[a-zA-Z]*)*$/g, "nombre de usuario invalido"),
    email: z.string().email(),
    password: z.string().regex(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/g, "password inseguro").optional(),
    rol: RolSchema
})

export const EmployeeSchema = z.object({
    id: z.number().min(1,"id mayor a 0").optional(),
    name: z.string().regex(/^[a-zA-Z]+(([',.-][a-zA-Z])?[a-zA-Z]*)*$/g, "nombre invalido"),
    lastname: z.string().regex(/^[a-zA-Z]+(([',.-][a-zA-Z])?[a-zA-Z]*)*$/g, "apellido invalido"),
    dni: z.number().min(1000000),
    phone: z.number(),
    employeeId: z.number(),
    direccion: z.string(),
    user: UserSchema
})

export type EmployeeModel = z.infer<typeof EmployeeSchema>;

export async function createEmployee(employee:EmployeeModel): Promise<EmployeeModel>{
    EmployeeSchema.parse(employee)
    return await (await fetch( process.env.SERVER_URL +"/employee",{method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify(employee)})).json();
}

export async function updateEmployee(employee:EmployeeModel, id:number): Promise<EmployeeModel>{
    return await (await fetch( process.env.SERVER_URL +"/employee/"+id,{method:"PUT", headers:{"Content-Type": "application/json"}, body:JSON.stringify(employee)})).json();
}

export async function listEmployee(): Promise<EmployeeModel[]>{
    return await (await fetch( process.env.SERVER_URL +"/employee")).json();
}

export async function getEmployeeWhitId(employeeId:any): Promise<EmployeeModel>{
    return await (await fetch( process.env.SERVER_URL + "/employee/"+ employeeId)).json();
}

export async function removeEmployeeWhitId(employeeId:any){
    await (await fetch( process.env.SERVER_URL + "/employee/"+ employeeId, {method:"DELETED"})).json();
}