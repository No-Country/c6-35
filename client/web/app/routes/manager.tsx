import { Link, NavLink, Outlet, useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import TitleDirectory from "~/components/TitleDirectory";
import icon from "~/../public/icons/row-left.svg";
import iemplye from "~/../public/icons/employee.svg";
import ijob from "~/../public/icons/job.svg";
import iteam from "~/../public/icons/team.svg";



function Menu() {
    const [show, setShow] = useState(false);
    
    return (<>
            <div className={"w-screen min-w-full sm:w-64 sm:min-w-[16rem] h-screen sticky bg-app-w-secodary left-0 top-0 flex-col border-r border-app-w-write-ash " + ((show)? "flex":"hidden")}>
                <button onClick={()=>{setShow(!show)}} className="h-8 w-8 bg-app-w-secodary absolute translate-y-5 right-0 mr-4 rounded-md sm:translate-y-24 sm:translate-x-8"></button>
                <div className="h-28 min-h-[7rem] w-full bg-app-w-primary flex items-center sm:block sm:items-start px-4 space-x-2 sm:space-x-0">
                    <div className="w-16 h-16 sm:ml-auto sm:mr-auto sm:translate-y-20 bg-app-w-primary-pale rounded-md border"></div>
                    <p className="sm:ml-auto sm:mr-auto text-center sm:translate-y-20 sm:mt-2 sm:-translate-x-1">Diego Noblega</p>
                </div>
                <div className="bg-app-w-write h-full">
                    <nav className="sm:flex">
                        <ul className="w-full mt-8 text-app-w-write-ash translate-y-20 text-left">
                            <li className="h-12 flex justify-center items-center"><div><NavLink to="./jobs"  className={({ isActive }) =>isActive ? "text-app-w-primary" : undefined}>Trabajos</NavLink></div></li>
                            <li className="h-12 flex justify-center items-center"><NavLink to="./workteam" className={({ isActive }) =>isActive ? "text-app-w-primary" : undefined}>Equipos de trabajos</NavLink></li>
                            <li className="h-12 flex justify-center items-center"><NavLink to="./employee" className={({ isActive }) =>isActive ? "text-app-w-primary" : undefined}>Empleados</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className={"fixed sm:sticky z-50  w-screen sm:w-16 sm:min-w-[4rem] h-12 sm:h-screen bg-app-w-secodary left-0 top-0 border-r border-app-w-write-ash flex sm:flex-col " + ((show)? "hidden":"")}>
                <div className="w-24 h-12 sm:w-full bg-app-w-primary">
                    <button className="w-full h-full" onClick={()=>{setShow(!show)}}></button>
                </div>
                <div className="bg-app-w-secodary w-full h-full">
                    <div className="hidden sm:flex">
                        <ul className="w-full mt-8 text-app-w-primary-pale">
                            <li className="h-12 flex justify-center items-center"><Link to="./jobs"><img src={ijob} className="h-4 w-4"></img></Link></li>
                            <li className="h-12 flex justify-center items-center"><Link to="./workteam"><img src={iteam} className="h-4 w-4"></img></Link></li>
                            <li className="h-12 flex justify-center items-center"><Link to="./employee"><img src={iemplye} className="h-4 w-4"></img></Link></li>
                        </ul>
                    </div>
                    <div></div>
                </div>
            </div>
    </>)
}


export default function Manager(params:{}) {
    const [routeTitle, setRouteTitle] = useState([""]);
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(()=>{
        setRouteTitle(location.pathname.split("/"));
    },[location])

    return (<>
        <div className="flex relative">
            <Menu></Menu>
            <div className="grow overflow-x-hidden mt-12 sm:mt-0 min-h-min">
                <div className="sticky sm:static top-0 left-0 w-full h-10 sm:h-12 bg-app-w-secodary text-app-w-write-gris flex items-center px-6 justify-between min-w-max">
                    <div className="flex items-center space-x-4">
                        <button onClick={()=>{navigate(-1)}}><img src={icon}></img></button>
                        <TitleDirectory directory={routeTitle}></TitleDirectory>
                    </div>
                </div>
                <main className="bg-app-w-write-back min-h-max">
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    </>)
}