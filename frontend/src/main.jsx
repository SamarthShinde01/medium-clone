import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Signin } from "./pages/Signin.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Blog } from "./pages/Blog.jsx";
import { Profile } from "./pages/Profile.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Blogs } from "./pages/Blogs.jsx";
import { PostBlog } from "./pages/PostBlog.jsx";
import store from "./store.js";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<App />}>
			<Route path="/signin" element={<Signin />} />
			<Route path="/signup" element={<Signup />} />

			<Route index path="/" element={<Dashboard />} />
			<Route path="/blog/:id" element={<Blog />} />
			<Route path="/blogs" element={<Blogs />} />
			<Route path="/post" element={<PostBlog />} />
			<Route path="/profile" element={<Profile />} />

			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	</Provider>
);
