import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const ErrorPage = ({ statusCode, message }) => {
	const defaultMessage = "Something went wrong. Please try again later.";

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<h1 className="text-4xl font-bold text-gray-800">
				{statusCode ? `Error ${statusCode}` : "Error"}
			</h1>
			<p className="mt-4 text-gray-600">{message || defaultMessage}</p>
			<Link
				to="/"
				className="mt-6 px-4 py-2 bg-green-600 text-white text-xl rounded hover:bg-green-700 transition"
			>
				<div className="flex justify-center items-center gap-3">
					<FaArrowLeft className="text-xl" />
					Go Back Home
				</div>
			</Link>
		</div>
	);
};
