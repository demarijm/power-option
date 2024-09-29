import { api } from "@/trpc/server";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { Menu as MenuIcon, Bell, X } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Header() {
	const views = await api.view.getAll();

	return (
		<Disclosure as="nav" className="bg-white shadow">
			<div className="mx-auto  px-4 sm:px-6 mb-3 lg:px-8">
				<div className="flex h-16 justify-between">
					<div className="flex">
						<div className="flex flex-shrink-0 items-center">
							<img
								alt="Your Company"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								className="h-8 w-auto"
							/>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							{views.map((item) => (
								<Link
									key={item.name}
									href={`/$view/${item.id}`}
									className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-med ${item.id ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						<button
							type="button"
							className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<span className="sr-only">View notifications</span>
							<Bell className="h-6 w-6" />
						</button>

						{/* Profile dropdown */}
						<Menu as="div" className="relative ml-3">
							<div>
								<MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
									<img
										alt=""
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										className="h-8 w-8 rounded-full"
									/>
								</MenuButton>
							</div>
							<MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
								<MenuItem>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700">
										Your Profile
									</a>
								</MenuItem>
								<MenuItem>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700">
										Settings
									</a>
								</MenuItem>
								<MenuItem>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700">
										Sign out
									</a>
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>
					<div className="-mr-2 flex items-center sm:hidden">
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
							<span className="sr-only">Open main menu</span>
							<MenuIcon className="block h-6 w-6 group-open:hidden" />
							<X className="hidden h-6 w-6 group-open:block" />
						</DisclosureButton>
					</div>
				</div>
			</div>

			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 pb-3 pt-2">
					{views.map((item) => (
						<DisclosureButton
							key={item.name}
							as="a"
							href={`/views/${item.id}`}
							className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${item.id ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
						>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
