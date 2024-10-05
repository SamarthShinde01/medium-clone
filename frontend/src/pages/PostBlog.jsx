import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const PostBlog = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState();
	const [content, setContent] = useState();
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			if (!title || !content) {
				toast("Please fill all the fields");
				return;
			}
			setLoading(true);
			await axios.post("/api/v1/blog", {
				title,
				content,
			});
			toast.success("Blog added successfully");
			navigate("/");
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold text-gray-900 mb-6">
				Create a New Post
			</h1>
			<form className="space-y-6" onSubmit={submitHandler}>
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700"
					>
						Title
					</label>
					<input
						type="text"
						name="title"
						id="title"
						onChange={(e) => setTitle(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						placeholder="Enter your blog title"
					/>
				</div>

				<div>
					<label
						htmlFor="content"
						className="block text-sm font-medium text-gray-700"
					>
						Content
					</label>
					<textarea
						id="content"
						name="content"
						onChange={(e) => setContent(e.target.value)}
						rows={8}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						placeholder="Write your blog content here..."
					></textarea>
				</div>

				<div>
					{!loading ? (
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Publish Post
						</button>
					) : (
						<button
							type="button"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Posting ...
						</button>
					)}
				</div>
			</form>
		</div>
	);
};
