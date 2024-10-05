import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ErrorPage } from "../pages/ErrorPage";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlices";

export const Layout = ({ children }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const { userInfo } = useSelector((state) => state.auth);
	const [logoutAPi, { isLoading }] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutAPi().unwrap();
			dispatch(logout());
			toast.success("Logged out successfully");
			setDropdownOpen(false);
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
			<ErrorPage
				statusCode={err.statusCode || "500"}
				message={err?.data?.message || err.error}
			/>;
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			<header className="bg-white shadow-sm">
				<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<Link to="/" className="flex-shrink-0 flex items-center">
								<span className="text-2xl font-bold text-gray-900">
									BlogApp
								</span>
							</Link>
						</div>
						<div className="flex items-center space-x-4">
							{!userInfo ? (
								<>
									<Link
										to="/signin"
										className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
									>
										Sign In
									</Link>
									<Link
										to="/signup"
										className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
									>
										Sign Up
									</Link>
								</>
							) : (
								<>
									<Link
										to="/post"
										className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
									>
										New Post
									</Link>

									<div className="relative">
										<button
											onClick={toggleDropdown}
											className="ml-4 flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 rounded-full focus:outline-none"
										>
											<span className="mr-2">
												{userInfo?.name?.split(" ")[0].toUpperCase()}
											</span>
											<svg
												className="h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</button>

										{/* Dropdown Menu */}
										{dropdownOpen && (
											<div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
												<Link
													to="/profile"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
													onClick={() => setDropdownOpen(false)} // Close dropdown on click
												>
													Profile
												</Link>
												<Link
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
													onClick={logoutHandler}
												>
													Logout
												</Link>
											</div>
										)}
									</div>
								</>
							)}
						</div>
					</div>
				</nav>
			</header>
			<main className="flex-grow">{children}</main>
			<footer className="bg-gray-100">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<p className="text-center text-gray-500 text-sm">
						© 2023 BlogApp. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};
