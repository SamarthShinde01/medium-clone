import { useEffect, useState } from "react";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/userApiSlices";
import { useUpdateProfileMutation } from "../slices/userApiSlices";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [profile, { isLoading }] = useProfileMutation();
	const [updateProfile] = useUpdateProfileMutation();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await profile().unwrap();
				setName(res.name);
				setUsername(res.username);
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		};

		fetchProfile();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (password !== confirmPassword) {
				toast.warning("Password and confirm password does not match");
				return;
			}

			const res = await updateProfile({ username, name, password }).unwrap();
			toast.success("Profile has been updated successfully");
			navigate("/profile");
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
			<div className="bg-white shadow-lg rounded-lg overflow-hidden">
				<form onSubmit={handleSubmit}>
					<div className="flex items-center p-6 space-x-6">
						{/* <img className="w-24 h-24 rounded-full object-cover border-2 border-gray-300" /> */}
						<div>
							<h1 className="text-4xl font-bold text-gray-900">
								Edit {name.split(" ")[0]}'s Profile
							</h1>
						</div>
					</div>

					<div className="p-6 space-y-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<Label label="Full Name" />
								<Input
									value={name}
									type="text"
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter Full Name"
								/>
							</div>
							<div>
								<Label label="User name" />
								<Input
									type="email"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									placeholder="Enter User name"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<Label label="Password" />
								<Input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Enter Passwords"
								/>
							</div>
							<div>
								<Label label="Confirm Password" />
								<Input
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="Enter Confirm Password"
								/>
							</div>
						</div>
						{/* <div>
							<Label label="Bio" />
							<textarea
								name="bio"
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
								placeholder="Tell us about yourself"
							/>
						</div> */}

						<div className="flex justify-end">
							<button className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition">
								Update Profile
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
