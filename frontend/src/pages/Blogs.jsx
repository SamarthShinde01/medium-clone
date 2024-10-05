import { Link } from "react-router-dom";

const blogs = [
	// {
	// 	id: 1,
	// 	title: "Getting Started with React",
	// 	author: "John Doe",
	// 	excerpt:
	// 		"React is a popular JavaScript library for building user interfaces...",
	// 	date: "2023-06-01",
	// },
	// {
	// 	id: 2,
	// 	title: "The Power of Tailwind CSS",
	// 	author: "Jane Smith",
	// 	excerpt:
	// 		"Tailwind CSS is a utility-first CSS framework that can speed up your development process...",
	// 	date: "2023-06-02",
	// },
	// {
	// 	id: 3,
	// 	title: "Next.js: The React Framework",
	// 	author: "Bob Johnson",
	// 	excerpt:
	// 		"Next.js is a React framework that enables functionality such as server-side rendering and generating static websites...",
	// 	date: "2023-06-03",
	// },
];

export const Blogs = () => {
	return (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<h1 className="text-4xl font-bold text-gray-900 mb-8">Latest Posts</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{blogs.map((blog) => (
					<article
						key={blog.id}
						className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
					>
						<img
							src={blog.imageUrl}
							alt={blog.title}
							className="w-full h-48 object-cover"
						/>
						<div className="px-6 py-5">
							<h2 className="text-xl font-bold text-gray-900 mb-3">
								<Link to={`/blog/${blog.id}`} className="hover:underline">
									{blog.title}
								</Link>
							</h2>
							<p className="text-sm text-gray-500 mb-2">
								By {blog.author} on {blog.date}
							</p>
							<p className="text-gray-700 line-clamp-3 mb-4">{blog.excerpt}</p>
							<div className="text-right">
								<Link
									to={`/blog/${blog.id}`}
									className="text-indigo-600 hover:text-indigo-800 font-medium"
								>
									Read more →
								</Link>
							</div>
						</div>
					</article>
				))}
			</div>
		</div>
	);
};
