import "./App.css";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import ClassroomPage from "./pages/classroom-page";
import SignupPage from "./pages/signup-page";
import PrivateRoute from "./components/private-router/private-router";
import Profile from "./pages/profile-user/profile-user.page";
import Invitation from "./pages/invitation/invitation.page";
// React router
import { BrowserRouter as Router, Route, Routes as Switch, useParams, Navigate } from "react-router-dom";
import { SocketIOProvider } from "./custome-hook";
import AdminPage from "./pages/admin-page/admin-page";
import AdminPrivateRoute from "./components/private-router/admin-private-router";
import ResetPasswordPage from "./pages/reset-password/reset-password.page";
import Activation from "./pages/activate-page/activate.page";
import ActivationRequest from "./pages/activate-page/activate-request";
import ErrorPage from "./pages/error-page/error-page";
import ReviewPageID from "./pages/reviewgrade-page/reviewgrade-id.page";
import UserProfile from "./pages/profile-user/user-profile.page";

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
						<Route path="/classrooms/:id" element={<TabProxy />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/classrooms/:id/:tab/:reviewId" element={<PrivateRoute>
									<ReviewPageID />
								</PrivateRoute>} />
						<Route path="/admin" element={<Navigate to="/admin/accounts" />} />
						<Route
							path="/admin/:tab"
							element={
								<AdminPrivateRoute>
									<AdminPage />
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/me"
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>
							<Route
							path="/users/:id"
							element={
								<PrivateRoute>
									<UserProfile />
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

						<Route
							path="/activation-request"
							element={
								<PrivateRoute>
									<ActivationRequest />
								</PrivateRoute>
							}
						/>

						<Route path="/reset-password" element={<ResetPasswordPage />} />

						<Route
							path="/locked"
							element={<ErrorPage errorMessage={"T??i kho???n c???a b???n ???? b??? kh??a."} navigateLink="/login" />}
						/>
					</Switch>
				</Router>
			</SocketIOProvider>
		</div>
	);
}
const TabProxy = () => {
	const params = useParams();
	return <Navigate to={"/classrooms/" + params.id + "/tab-detail"} />;
};
export default App;
