export const Input = ({ type = "text", onChange, value }) => {
	return (
		<div className="mt-1">
			<input
				value={value}
				type={type}
				onChange={onChange}
				required
				className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
			/>
		</div>
	);
};
