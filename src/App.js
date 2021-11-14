import "./App.css";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import PrivateRoute from "./components/private-router";
import Profile from "./pages/Profile/Profile.page";
// React router
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
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
                {" "}
                <Profile />
              </PrivateRoute>
            }
          />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
