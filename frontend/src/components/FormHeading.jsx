import { Link } from "react-router-dom";

export const FormHeading = ({ formHeading, link, linkText, linkHeading }) => {
	return (
		<div className="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
				{formHeading}
			</h2>
			<p className="mt-2 text-center text-sm text-gray-600">
				{linkHeading}
				<Link
					to={link}
					className="font-medium text-green-600 hover:text-green-500"
				>
					{linkText}
				</Link>
			</p>
		</div>
	);
};
