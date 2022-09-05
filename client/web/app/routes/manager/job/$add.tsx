import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useOutletContext, useParams, useSubmit } from "@remix-run/react";
import { useRef, useState } from "react";
import Button, { TypeButton } from "~/components/Button";
import Input from "~/components/Input";
import Table from "~/components/Table";
import { EmployeeModel } from "~/server/employee.server";
import { createWorkTeam } from "~/server/workteam.server";
import { listWorkOrder, WorkOrderModel } from "~/server/workteam.server copy";


interface Errors {
    code?: string;
}

interface ActionData {
    errors?: Errors
  }

export const loader: LoaderFunction =async ({params,request}) => {
}

export const action: ActionFunction =async ({params, request}) => {
    const form = await request.formData();
    const employees = JSON.parse(form.get("employees")?.toString()!) as number[]
    console.log(await createWorkTeam({
        employees: employees.map((n)=>({id:n})) as EmployeeModel[],
        code: form.get("code")?.toString()!,
        jobs: []
    }))
    return json({})
}

export default function AddWorkTeam() {
    const actionData = useActionData() as ActionData;
    const {data, type} = useLoaderData() as {data:WorkOrderModel[], type:string};
    const formRef = useRef<HTMLFormElement>(null);
    const submit = useSubmit();
    function handleSubmit(event:any) {
        let formData = new FormData(formRef.current!)
        submit(formData, {method:"post", action:event.target.action});
        event.preventDefault();
    }

    return (<>
        <div className="p-2 md:px-6 min-h-screen">
            <div className="text-2xl mb-2">
                <h1>Alta de equipo</h1>
            </div>
            <div className="mx-2"></div>
            <div className="mt-6 space-y-4">
                <Form method="post" ref={formRef} onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col p-4 border-solid border border-app-w-write-ash bg-app-w-write rounded-md">
                    <div className="space-y-4 flex flex-col">
                        <Input name="code" value={""} title="codigo de trabajo" errMsj={""} type="number"></Input>
                        <Input name="observacion" value={""} title="ovservación" errMsj={""} type="text"></Input>
                        <Input name="municipio" value={0} title="municipio" errMsj={""} type="number"></Input>
                        <Input name="localidad" value={0} title="localidad" errMsj={""} type="number"></Input>
                        <Input name="street" value={""} title="calle" errMsj={""} type="text"></Input>
                        <Input name="altura" value={""} title="altura" errMsj={""} type="text"></Input>
                        <Input name="latitud" value={""} title="latitud" errMsj={""} type="text"></Input>
                        <Input name="logitud" value={""} title="longitud" errMsj={""} type="text"></Input>
                    </div>
                    </div>
                    <div className="mt-2"><Button onClick={()=>{}} text={"Confirm"} type={TypeButton.Confirm}></Button></div>
                </Form>
            </div>
        </div>
    </>)
}