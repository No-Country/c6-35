
import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import ManagerBar from "~/components/ManagerBar";
import Table from "~/components/Table";
import TitleDirectory from "~/components/TitleDirectory";



export default function EmployeeAdmin() {

    const [employees, setEmployees] = useState([]);
    const [title, setTitle] = useOutletContext<String>();

    useEffect(() => {
        let a = async ()=>{
            let data = await (await fetch("http://127.1.1.1:8080/employee")).json();
            console.log(data);
            setEmployees(data)
        }
        a();
    }, [])
    
    return (<>
        <div className="px-6 pt-4">
            <div>
                <TitleDirectory directory={[title,"Listado"]}></TitleDirectory>
            </div>
            <ManagerBar onAddClick={()=>{}} onDelateClick={()=>{}} onEditColumnsClick={()=>{}} onMassiveClick={()=>{}}></ManagerBar>
            <div className="relative">
                <Table row={10}
                    colums={[
                    {key:"employeeId", name:"legajo"},
                    {key:"name", name:"nombre"},
                    {key:"lastname", name:"apellido"},
                    {key:"dni", name:"DNI"},
                    {key:"phone", name:"celular"},
                    {key:"direccion", name:"dirección"}]} 
                    
                    data={employees}></Table>
            </div>
        </div>
    </>)
}
