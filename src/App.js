import "./App.css";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import ClassroomPage from "./pages/classroom-page";
import SignupPage from "./pages/signup-page";
import PrivateRoute from "./components/private-router";
import Profile from "./pages/profile-user/profile-user.page";
import Invitation from "./pages/invitation/invitation.page";
// React router
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import { SocketIOProvider } from "./custome-hook";
import ResetPasswordPage from "./pages/reset-password/reset-password.page";
import Activation from "./pages/activate-page/activate.page";

function App() {
	return (
		<div className="App">
			<SocketIOProvider>
				<Router>
					<Switch>
						<Route
							path="/classrooms/:id/:tab"
							element={
								<PrivateRoute>
									<ClassroomPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/"
							element={
								<PrivateRoute>
									<HomePage />
								</PrivateRoute>
							}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />

						<Route
							path="/me"
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>

						<Route
							path="/invitation"
							element={
								<PrivateRoute>
									<Invitation />
								</PrivateRoute>
							}
						/>

						<Route
							path="/activate"
							element={
								<PrivateRoute>
									<Activation />
								</PrivateRoute>
							}
						/>

						<Route path="/reset-password" element={<ResetPasswordPage />} />
					</Switch>
				</Router>
			</SocketIOProvider>
		</div>
	);
}
export default App;
