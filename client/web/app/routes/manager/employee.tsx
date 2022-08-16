import { Outlet } from "@remix-run/react";
import { useState } from "react";

export default function Employee(params:{}) {

    const [title,setTitle] = useState("Administrador Empleados");

    return(
        <>
            <Outlet context={[title, setTitle]}></Outlet>
        </>
    )
}