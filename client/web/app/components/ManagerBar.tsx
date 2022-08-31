import { useState } from "react";
import { string } from "zod";
import Button, { TypeButton } from "./Button";

export default function ManagerBar(params:{onAddClick:Function|string, onMassiveClick:Function|string, onDelateClick:Function|string, columns:{key:string,name:string,on:boolean}[], setColumns:Function}) {
    const [show, setShow] = useState(false);
    const [showEditColumns, setShowEditColumns] = useState(false);
    
    function onChangeHandle(i:any) {
        let colums =[...params.columns];
        colums[i].on = !(colums[i].on); 
        console.log(colums[i]);
        params.setColumns(colums)
    }
    return (<>
        <div className="my-2 p-2 flex border-[#8D99AE] bg-app-w-write border-solid border-[1px] rounded-md flex-wrap">
            <div className="px-1 flex">
                <div className="grow sm:hidden">
                    <div className="mx-1 my-1 w-12"><Button onClick={()=>{setShow(!show)}} text={"+"} type={TypeButton.Confirm}></Button></div>
                </div>
                <div className="flex-col hidden sm:flex">
                    <div className="mx-1 my-1"><Button onClick={params.onAddClick} text={"Agregar"} type={TypeButton.Confirm}></Button></div>
                    <div className="mx-1 my-1"><Button onClick={params.onMassiveClick} text={"Carga Masiva"} type={TypeButton.Default}></Button></div>
                </div>
                <div className="flex sm:flex-col">
                    <div className="mx-1 my-1"><Button onClick={params.onDelateClick} text={"Eliminar"} type={TypeButton.Cansel}></Button></div>
                    <div className="mx-1 my-1"><Button onClick={()=>{setShowEditColumns(!showEditColumns)}} text={"Editar Columnas"} type={TypeButton.Default}></Button>
                    <div className={"fixed sm:absolute w-full h-80 sm:h-auto sm:w-32 sm:border sm:mt-1 sm:-ml-1 bg-app-w-write-back border-t-app-w-secodary border-t bottom-0 sm:bottom-auto sm:left-auto left-0 z-50 rounded-t-2xl sm:rounded-md flex-col justify-center items-center space-y-8 sm:space-y-1 overflow-y-scroll sm:overflow-y-auto " + ((showEditColumns)? "flex":"hidden")}>
                        {params.columns.map(({key, name, on},i)=><><div className="mx-1 my-1 w-3/4"><label><input type="checkbox" className="mr-2" key={key} value={key} checked={on} onChange={()=>{onChangeHandle(i)}}></input>{name}</label></div></>)}
                    </div>
            </div>
                </div>
            </div>
            <div className="w-full sm:w-auto">
                <div className="px-2 mt-1 w-full sm:w-auto">
                    
                </div>
            </div>
        </div>
        <div className={"fixed w-full h-80 bg-app-w-write-back border-t-app-w-secodary border-t bottom-0 left-0 z-50 rounded-t-2xl flex-col justify-center items-center space-y-8 sm:hidden " + ((show)? "flex":"hidden")}>
                    <div className="mx-1 my-1 w-3/4"><Button onClick={params.onAddClick} text={"Agregar"} type={TypeButton.Confirm}></Button></div>
                    <div className="mx-1 my-1 w-3/4"><Button onClick={params.onMassiveClick} text={"Carga Masiva"} type={TypeButton.Confirm}></Button></div>
        </div>
    </>)
}