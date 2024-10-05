import { Outlet } from "react-router-dom";
import { Layout } from "./components/Layout";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<>
			<Layout>
				<Outlet />
				<ToastContainer />
			</Layout>
		</>
	);
}

export default App;
