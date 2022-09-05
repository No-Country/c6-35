import { Outlet, useOutletContext } from "@remix-run/react";

export default function Job(params:{}) {
    return(
        <>
            <Outlet></Outlet>
        </>
    )
}