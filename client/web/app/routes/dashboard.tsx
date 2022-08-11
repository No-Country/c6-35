import { Form, Link, NavLink, Outlet } from '@remix-run/react'
export const Avatar = () => {
	return (
		<svg
			viewBox="0 0 36 36"
			fill="none"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			width="80"
			height="80"
		>
			<title>Daisy Gatson</title>
			<mask
				id="mask__beam"
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="36"
				height="36"
			>
				<rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
			</mask>
			<g mask="url(#mask__beam)">
				<rect width="36" height="36" fill="#917f6e"></rect>
				<rect
					x="0"
					y="0"
					width="36"
					height="36"
					transform="translate(2 2) rotate(142 18 18) scale(1.1)"
					fill="#efd2be"
					rx="36"
				></rect>
				<g transform="translate(-6 -5) rotate(2 18 18)">
					<path
						d="M15 20c2 1 4 1 6 0"
						stroke="#000000"
						fill="none"
						strokeLinecap="round"
					></path>
					<rect
						x="12"
						y="14"
						width="1.5"
						height="2"
						rx="1"
						stroke="none"
						fill="#000000"
					></rect>
					<rect
						x="22"
						y="14"
						width="1.5"
						height="2"
						rx="1"
						stroke="none"
						fill="#000000"
					></rect>
				</g>
			</g>
		</svg>
	)
}
export default function DashboardOutlet() {
	return (
		<>
			<header className="font-bold bg-gray-100 font-lato">
				<nav className="container mx-auto navbar">
					<aside className="flex-1">
						<h1 className="text-xl normal-case btn btn-ghost">
							<NavLink to="/dashboard/">Home</NavLink>
						</h1>
					</aside>

					<aside className="navbar-end">
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className=" btn btn-ghost btn-circle avatar">
								<div className="rounded-full ">
									<Avatar />
								</div>
							</label>
							<ul
								tabIndex={0}
								className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
							>
								<li>
									<NavLink to="/dashboard/profile" className="justify-between">
										Perfil
									</NavLink>
								</li>

								<li>
									<Form method="post">
										<button name="signOut" value="_true" type="submit">
											{' '}
											Cerrar sesión
										</button>
									</Form>
								</li>
							</ul>
						</div>
					</aside>
				</nav>
			</header>

			<main className="relative h-screen xl:flex xl:flex-row">
				<div className="h-full w-[20rem] border-r-2 border-base-200">
					<div className="flex flex-col items-center justify-center h-full space-y-6">
						<Link to="/dashboard/order-work/load">Cargar ordenes de trabajo</Link>
						<Link to="/dashboard/order-work/view">Ver listado de ordenes</Link>

						<Link to="/dashboard/order-work/map">Ver en mapa</Link>
					</div>
				</div>
				<Outlet />
			</main>
		</>
	)
}
