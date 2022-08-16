import { Outlet } from "@remix-run/react";

export default function Manager(params:{}) {
    return (<>
        <div className="flex">
            <div className="w-64 h-screen sticky bg-[#252B42] left-0 top-0">
                <button></button>
            </div>
            <div className="grow">
                <div className="w-full h-12 bg-[#252B42]"></div>
                <main>
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    </>)
}