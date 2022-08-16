import { useOutletContext, useParams } from "@remix-run/react";
import TitleDirectory from "~/components/TitleDirectory";

export default function AddEmployee() {
    const [title, setTitle] = useOutletContext<String>();

    return (<>
        <div>
            <TitleDirectory directory={[title,"Agregar"]}></TitleDirectory>
        </div>
    </>)
}