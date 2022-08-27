

export interface EmployeeModel {
    id?: number;
    name:string,
    lastname:string,
    dni:string,
    phone:number,
    employeeId:number,
    direccion:string,
    user:{
        userName:string,
        email:string,
        password:string,
        rol:{id:number}
    }
}


export async function createEmployee(employee:EmployeeModel): Promise<EmployeeModel>{
    console.log(employee)
    return await (await fetch( process.env.SERVER_URL +"/employee",{method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify(employee)})).json();
}

export async function listEmployee(): Promise<EmployeeModel[]>{
    return await (await fetch( process.env.SERVER_URL +"/employee")).json();
}

export async function getEmployeeWhitId(employeeId:any): Promise<EmployeeModel>{
    return await (await fetch( process.env.SERVER_URL + "/employee/"+ employeeId)).json();
}

export async function removeEmployeeWhitId(employeeId:any): Promise<EmployeeModel>{
    return await (await fetch( process.env.SERVER_URL + "/employee/"+ employeeId, {method:"DELETED"})).json();
}