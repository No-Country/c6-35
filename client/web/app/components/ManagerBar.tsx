import Button from "./Button";

export default function ManagerBar(params:{onAddClick:Function, onMassiveClick:Function, onDelateClick:Function, onEditColumnsClick:Function}) {
    return (<>
        <div className="my-2 p-2 flex border-[#8D99AE] border-solid border-[1px] rounded-md">
            <div className="px-1 flex">
                <div className="flex flex-col">
                    <div className="mx-1 my-1"><Button onClick={params.onAddClick} text={"Agregar"} type="confirm"></Button></div>
                    <div className="mx-1 my-1"><Button onClick={params.onMassiveClick} text={"Carga Masiva"} type="default"></Button></div>
                </div>
                <div className="flex flex-col">
                    <div className="mx-1 my-1"><Button onClick={params.onDelateClick} text={"Eliminar"} type="cansel"></Button></div>
                    <div className="mx-1 my-1"><Button onClick={params.onEditColumnsClick} text={"Editar Columnas"} type="default"></Button></div>
                </div>
            </div>
            <div className="w-[1px] bg-[#8D99AE] rounded-lg"></div>
            <div>
                <div className="px-2">
                    <form>
                        <button className=""><img src={require("./../../public/icons/search.svg")}></img></button>
                        <select name="select" className="text-[#8D99AE] text-[0.7rem]">
                            <option value="value1">Value 1</option>
                            <option value="value2" selected>Value 2</option>
                            <option value="value3" selected>Value 2</option>
                        </select>
                        <input type="text" className="h-6 border-solid border-2 border-[#F2F2F2] rounded p-2 text-[0.8rem]"></input>
                    </form>
                </div>
            </div>
            <div></div>
        </div>
    </>)
}