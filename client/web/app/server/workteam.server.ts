import { EmployeeModel } from "./employee.server";


export interface WorkTeamModel {
    id?:number;
    employees:EmployeeModel[],
    jobs:{
        id:number,
        code:number,
        name:string
    }[]
}


export async function createWorkTeam(workteam:WorkTeamModel): Promise<WorkTeamModel>{
    return await (await fetch( process.env.SERVER_URL +"/workteam",{method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify(workteam)})).json();
}

export async function listWorkTeam(): Promise<WorkTeamModel[]>{
    return await (await fetch( process.env.SERVER_URL +"/workteam")).json();
}

export async function getWorkTeamWhitId(employeeId:any): Promise<WorkTeamModel>{
    return await (await fetch( process.env.SERVER_URL + "/workteam/"+ employeeId)).json();
}

export async function removeWorkTeamWhitId(employeeId:any){
    await (await fetch( process.env.SERVER_URL + "/workteam/"+ employeeId, {method:"DELETED"})).json();
}