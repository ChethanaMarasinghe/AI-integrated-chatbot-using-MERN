import Header from "./components/shared/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

import styles from "./App.module.css";

function App() {
	return (
		<div>
			<Header />
			<main className={styles.routes}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/chat' element={<Chat />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
