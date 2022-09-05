import {z} from "zod";

export const TypeOfWorkShema = z.object({
    id: z.number().min(0,"id mayor a 0"),
    denominacion: z.string()
})

export const municipalityShema = z.object({
    id: z.number().min(0,"id mayor a 0"),
    denominacion: z.string()
})

export const localityShema = z.object({
    id: z.number().min(0,"id mayor a 0"),
    denominacion: z.string()
})

export const AddressShema = z.object({
    id: z.number().min(0,"id mayor a 0"),
    observacion: z.string(),
    municipality: municipalityShema,
    location: localityShema,
    street: z.string(),
    number: z.string()
})

export const WorkOrderShema = z.object({
    id: z.number().min(0,"id mayor a 0"),
    code: z.number().min(0,"id mayor a 0"),
    observacion: z.string(),
    typeOfWork: TypeOfWorkShema,
    address: AddressShema
})

export type WorkOrderModel = z.infer<typeof WorkOrderShema>;

export async function createWorkOrder(workOrder:WorkOrderModel): Promise<WorkOrderModel>{
    return await (await fetch( process.env.SERVER_URL +"/workOrder",{method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify(workOrder)})).json();
}

export async function updateWorkOrder(workOrder:WorkOrderModel, id:number): Promise<WorkOrderModel>{
    return await (await fetch( process.env.SERVER_URL +"/workOrder/" + id,{method:"PUT", headers:{"Content-Type": "application/json"}, body:JSON.stringify(workOrder)})).json();
}

export async function listWorkOrder(): Promise<WorkOrderModel[]>{
    return await (await fetch( process.env.SERVER_URL +"/workOrder")).json();
}

export async function getWorkTeamWhitId(employeeId:any): Promise<WorkOrderModel>{
    return await (await fetch( process.env.SERVER_URL + "/workOrder/"+ employeeId)).json();
}

export async function removeWorkTeamWhitId(employeeId:any){
    await (await fetch( process.env.SERVER_URL + "/workOrder/"+ employeeId, {method:"DELETED"})).json();
}