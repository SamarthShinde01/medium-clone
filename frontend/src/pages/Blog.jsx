import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const Blog = () => {
	const params = useParams();
	const [post, setPost] = useState("");
	const [author, setAuthor] = useState({});

	useEffect(() => {
		try {
			const fetchPost = async () => {
				const res = await axios.get(`/api/v1/blog/${params.id}`);

				if (res.data) {
					const user = await axios.get("/api/v1/user/author", {
						id: res.data.authorId,
					});
					setAuthor(user.data);
				}

				setPost(res.data);
			};

			fetchPost();
		} catch (err) {
			console.error(err);
			toast.error(err?.message);
		}
	}, []);
	return (
		<article className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
			<div className="text-sm text-gray-500 mb-8">
				By {author?.name || "anonymous"} on {post.date}
			</div>
			<div className="prose prose-indigo max-w-none">
				{/* {post.content.split("\n\n").map((paragraph, index) => (
					<p key={index} className="mb-4">
						{paragraph}
					</p>
				))} */}

				{post.content}
			</div>
		</article>
	);
};

// const post = {
// 	title: "Getting Started with React",
// 	author: "John Doe",
// 	date: "June 1, 2023",
// 	content: `
//       React is a popular JavaScript library for building user interfaces. It was developed by Facebook and has gained widespread adoption in the web development community.

//       Here are some key concepts to understand when getting started with React:

//       1. Components: React applications are built using components. These are reusable pieces of UI that can be composed to create complex interfaces.

//       2. JSX: React uses JSX, a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.

//       3. State and Props: React components can have state (internal data that can change) and props (data passed from parent components).

//       4. Virtual DOM: React uses a virtual DOM to optimize rendering performance, updating only the parts of the actual DOM that have changed.

//       To start building with React, you'll need to set up your development environment. This typically involves using tools like Create React App, which sets up a new React project with a sensible default configuration.

//       Once you have your environment set up, you can start creating components and building your application. React's component-based architecture makes it easy to create modular, reusable code.

//       As you progress, you'll want to learn about more advanced concepts like hooks, context, and routing. These features allow you to manage state across your application, share data between components, and create multi-page applications.

//       React has a vibrant ecosystem with many libraries and tools available to help you build powerful web applications. Some popular choices include Redux for state management, React Router for routing, and styled-components for styling.

//       Remember, the key to mastering React is practice. Start with small projects and gradually build up to more complex applications. Happy coding!
//     `,
// };
