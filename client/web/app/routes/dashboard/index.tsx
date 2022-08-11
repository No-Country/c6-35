import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'


export const meta:MetaFunction = () => ({title:'Dashboard'})

export default function DashboardHome() {
	return (
		<>
			<h3 className="text-2xl text-center">Bienvenido! Que desea realizar?</h3>
			<section className="grid h-full grid-cols-4 gap-3">
				<Link to="/dashboard/order-work/load">Cargar ordenes de trabajo</Link>
				<Link to="/dashboard/order-work/view">Ver listado de ordenes</Link>

				<Link to="/dashboard/order-work/map">Ver en mapa</Link>
			</section>
		</>
	)
}
