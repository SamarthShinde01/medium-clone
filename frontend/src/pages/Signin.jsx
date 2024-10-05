import { Link, useNavigate } from "react-router-dom";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { FormHeading } from "../components/FormHeading";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useSigninMutation } from "../slices/userApiSlices";
import { toast } from "react-toastify";

export const Signin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const [signin, { isLoading }] = useSigninMutation();

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const res = await signin({ username, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success("Signed In Successfully");
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<div className="min-h-full bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<FormHeading
				formHeading="Sign In"
				link="/signup"
				linkText="Sign Up"
				linkHeading="Not have an account? "
			/>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={submitHandler}>
						<div>
							<Label label="Email Address" />
							<Input
								type="email"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>

						<div>
							<Label label="Password" />
							<Input
								type="password"
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
