import { Form, Link, useActionData, useTransition } from '@remix-run/react'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import {
	inputFromForm,
	makeDomainFunction,
	errorMessagesForSchema,
} from 'remix-domains'
import type { ActionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { z } from 'zod'

// 'Schema' (Función que valida que cierta variable cumpla con el tipo o valor correspondiente) que se empleará para validar los inputs de Login
export const signInValidator = z.object({
	username: z.string().min(5, { message: 'Campo requerido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})

export const meta: MetaFunction = () => ({ title: 'Inicia sesión en Doxny' })

// 'makeDomainFunction' Es una función que valida que los valores ingresados cumplan con el schema implementado, y realizará las acciones correspondiente en caso de que sea válido, o no
export const action = async ({ request }: ActionArgs) => {
	const LoginDomainFunction = makeDomainFunction(signInValidator)(
		async (values) => {
			return values
		}
	)
	//Se valida que los valores ingresados dentro del input, concuerden con el schema ingresado (En este caso, sería signInValidator)
	const result = await LoginDomainFunction(await inputFromForm(request))

	//Devuelve los errores de cada input, y a su vez, los errores externos a los inputs, que pueden ser generados por el primitivo Error.
	const inputErrors = errorMessagesForSchema(result.inputErrors, signInValidator)
	return json({
		errors: result.errors,
		username: inputErrors.username,
		password: inputErrors.password,
	})
}

export const SignInLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<header className="sticky top-0 z-10 w-full font-bold border-b-2 border-gray-100 font-gray-600 bg-base-100 font-rubik navbar">
				<h1 className="text-xl text-primary-focus btn btn-link">
					<Link to="/">Home</Link>
				</h1>
			</header>
			<main className="h-screen ">{children}</main>
		</>
	)
}
export default function LoginPage() {
	const formRef = useRef<HTMLFormElement | null>(null)
	const actionData = useActionData<typeof action>()
	const transition = useTransition()
	const isSubmitting = transition.state === 'submitting'

	//useEffect se emitirá cada vez que se submitee el form, y reiniciará el formulario, pudiendo mostrar los errores de los inputs, o reedirigir/realizar acciones.
	useEffect(() => {
		formRef.current?.reset()
	}, [isSubmitting])
	return (
		<SignInLayout>
			<section className="min-h-screen hero bg-base-200">
				<article className="flex-col hero-content lg:flex-row-reverse">
					<div className=" lg:text-left">
						<h1 className="text-4xl font-bold text-center ">
							Gestiona tu tareas de manera eficaz
						</h1>
						<p className="py-6 text-center ">
							Con ... puedes gestionar tus tareas, asignar las mísmas a distíntas
							personas de manera eficaz!
						</p>
					</div>

					<div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
						<Form method="post" className="card-body" ref={formRef}>
							<aside className="form-control">
								<label className="label">
									<span className="label-text">Nombre de usuario</span>
								</label>
								<input
									type="text"
									name="username"
									placeholder="Por ej. Pepito123!"
									disabled={isSubmitting}
									className={`w-full max-w-xs input input-bordered ${
										actionData && actionData?.username && 'input-error'
									}`}
								/>
								<span className="h-6 text-red-500">
									{actionData ? actionData?.username : null}
								</span>
							</aside>
							<aside className="form-control">
								<label className="label">
									<span className="label-text">Contraseña</span>
								</label>
								<input
									type="password"
									name="password"
									disabled={isSubmitting}
									className={`w-full max-w-xs input input-bordered ${
										actionData && actionData?.password && 'input-error'
									}`}
									placeholder="Por ej. lacontrasepadepepito123..."
								/>
								<span className="h-6 text-red-500">
									{actionData && actionData.errors ? actionData?.password : null}
								</span>
							</aside>
							{actionData && !isSubmitting && actionData.errors.length > 0 ? (
								<span className="toast toast-right toast-end">
									<p className="font-bold alert alert-error">
										{actionData && actionData?.errors[0].message}
									</p>
								</span>
							) : null}
							<button
								type="submit"
								className={`btn bg-gray-500 ${isSubmitting && 'loading'}`}
								disabled={isSubmitting}
							>
								{!isSubmitting ? 'Iniciar sesión' : 'Iniciando...'}
							</button>
							<Link className="text-center link" to="/password-recovery">
								Olvidé mi contraseña
							</Link>
						</Form>
					</div>
				</article>
			</section>
		</SignInLayout>
	)
}
