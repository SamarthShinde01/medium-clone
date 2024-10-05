import { useEffect, useState } from "react";
import axios from "axios";
import { BlogComponent } from "./BlogComponent";

export const BlogsHero = () => {
	const [blogs, setBlogs] = useState([]);
	useEffect(() => {
		try {
			const fetchBlogs = async () => {
				const res = await axios.get("/api/v1/blog/bulk");
				setBlogs(res.data);
			};

			fetchBlogs();
		} catch (err) {
			console.error(err);
		}
	}, []);

	return (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold text-gray-900 mb-6">Latest Posts</h1>
			<div className="space-y-8">
				{blogs.map((blog) => (
					<BlogComponent key={blog.id} blog={blog} />
				))}
			</div>
		</div>
	);
};
