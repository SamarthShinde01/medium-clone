import { Link, useNavigate } from "react-router-dom";
import { FormHeading } from "../components/FormHeading";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorPage } from "./ErrorPage";
import { setCredentials } from "../slices/authSlice";
import { useSignupMutation } from "../slices/userApiSlices";

export const Signup = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const [signup, { isLoading }] = useSignupMutation();

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const res = await signup({ name, username, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success("Signed Up Successfully");
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<div className="min-h-full bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<FormHeading
				formHeading="Sign Up"
				link="/signin"
				linkText="Sign In"
				linkHeading="Already User? "
			/>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={submitHandler} method="POST">
						<div>
							<Label label="Full Name" />
							<Input
								placeholder="Samarth Shinde"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<Label label="Email Address" />
							<Input
								type="email"
								placeholder="samarth@gmail.com"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>

						<div>
							<Label label="Password" />
							<Input
								type="password"
								placeholder="* * * * * * *"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<div className="text-sm">
							<Link
								to="/forgot-password"
								className="font-medium text-green-600 hover:text-green-500"
							>
								Forgot your password?
							</Link>
						</div>

						<div>
							<Button buttonText="Sign In" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
