import { useState } from "react";
import { string } from "zod";
import Button from "./Button";

export default function ManagerBar(params:{onAddClick:Function|string, onMassiveClick:Function|string, onDelateClick:Function|string, onEditColumnsClick:Function|string}) {
    const [show, setShow] = useState(false);
    
    return (<>
        <div className="my-2 p-2 flex border-[#8D99AE] bg-app-w-write border-solid border-[1px] rounded-md flex-wrap">
            <div className="px-1 flex">
                <div className="grow sm:hidden">
                    <div className="mx-1 my-1 w-12"><Button onClick={()=>{setShow(!show)}} text={"+"} type="confirm"></Button></div>
                </div>
                <div className="flex-col hidden sm:flex">
                    <div className="mx-1 my-1"><Button onClick={params.onAddClick} text={"Agregar"} type="confirm"></Button></div>
                    <div className="mx-1 my-1"><Button onClick={params.onMassiveClick} text={"Carga Masiva"} type="default"></Button></div>
                </div>
                <div className="flex sm:flex-col">
                    <div className="mx-1 my-1"><Button onClick={params.onDelateClick} text={"Eliminar"} type="cansel"></Button></div>
                    <div className="mx-1 my-1"><Button onClick={params.onEditColumnsClick} text={"Editar Columnas"} type="default"></Button></div>
                </div>
            </div>
            <div className="w-full sm:w-auto">
                <div className="px-2 mt-1 w-full sm:w-auto">
                    <form className="flex w-full  sm:w-auto h-9 sm:h-7">
                        <button className="min-w-[2rem] w-8 flex justify-center items-center bg-app-w-secodary rounded-l-lg"><img src={require("./../../public/icons/search.svg")}></img></button>
                        <select name="select" className="text-app-w-write bg-app-w-secodary text-[0.8rem]">
                            <option value="value1">Apellido</option>
                            <option value="value2" selected>Nombre</option>
                            <option value="value3" selected>Dni</option>
                        </select>
                        <input type="text" className="h-full w-full border-solid border border-app-w-secodary rounded-r-lg px-2 text-[0.8rem]"></input>
                    </form>
                </div>
            </div>
        </div>
        <div className={"fixed w-full h-80 bg-app-w-write-back border-t-app-w-secodary border-t bottom-0 left-0 z-50 rounded-t-2xl flex-col justify-center items-center space-y-8 sm:hidden " + ((show)? "flex":"hidden")}>
                    <div className="mx-1 my-1 w-3/4"><Button onClick={params.onAddClick} text={"Agregar"} type="confirm"></Button></div>
                    <div className="mx-1 my-1 w-3/4"><Button onClick={params.onMassiveClick} text={"Carga Masiva"} type="confirm"></Button></div>
        </div>
    </>)
}