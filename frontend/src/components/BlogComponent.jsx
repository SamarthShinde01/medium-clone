import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const BlogComponent = ({ blog }) => {
	const [author, setAuthor] = useState("anonymous author");
	useEffect(() => {
		const fetchAuthor = async () => {
			const res = await axios.get("/api/v1/user/author", { id: blog.id });
			setAuthor(res.data.name);
		};

		fetchAuthor();
	}, []);

	return (
		<article
			key={blog.id}
			className="bg-white shadow overflow-hidden sm:rounded-lg"
		>
			<div className="px-4 py-5 sm:p-6">
				<h2 className="text-2xl font-semibold text-gray-900 mb-2">
					<Link to={`/blog/${blog.id}`} className="hover:underline">
						{blog.title}
					</Link>
				</h2>
				<p className="text-sm text-gray-500 mb-2">
					By {author} on {new Date(blog.createdAt).toLocaleDateString()}
				</p>
				<p className="text-gray-700">{blog.content.slice(0, 300)} ........</p>
				<div className="mt-4">
					<Link
						to={`/blog/${blog.id}`}
						className="text-indigo-600 hover:text-indigo-800"
					>
						Read more →
					</Link>
				</div>
			</div>
		</article>
	);
};

// const blogs = [
// 	{
// 		id: 1,
// 		title: "Getting Started with React",
// 		author: "John Doe",
// 		excerpt:
// 			"React is a popular JavaScript library for building user interfaces...",
// 		date: "2023-06-01",
// 	},
// 	{
// 		id: 2,
// 		title: "The Power of Tailwind CSS",
// 		author: "Jane Smith",
// 		excerpt:
// 			"Tailwind CSS is a utility-first CSS framework that can speed up your development process...",
// 		date: "2023-06-02",
// 	},
// 	{
// 		id: 3,
// 		title: "Next.js: The React Framework",
// 		author: "Bob Johnson",
// 		excerpt:
// 			"Next.js is a React framework that enables functionality such as server-side rendering and generating static websites...",
// 		date: "2023-06-03",
// 	},
// ];
