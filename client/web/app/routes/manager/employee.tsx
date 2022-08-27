import { Outlet, useOutletContext } from "@remix-run/react";

export default function Employee(params:{}) {
    return(
        <>
            <Outlet></Outlet>
        </>
    )
}