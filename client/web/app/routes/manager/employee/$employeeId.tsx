import { useOutletContext, useParams } from "@remix-run/react"
import TitleDirectory from "~/components/TitleDirectory";

export default function EmployeeId() {
    const params = useParams();
    const [title, setTitle] = useOutletContext<String>();

    return (<>
    <div>
        <TitleDirectory directory={[title,"employee Id", params.employeeId!]}></TitleDirectory>
    </div>
    </>)
}