import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./components/mainpage/Landing";
// import OnboardForm from "./components/on-board-form/OnboardForm";
// import LoginCallback from "./components/LoginCallback";
// import Navbar from "./components/mainpage/Navbar";
// import Footer from "./components/mainpage/Footer";
// import POTD from "./components/potdpage/potd";
// import Concept from "./components/potdpage/concept";
// import AllProblems from "./components/problemset/AllProblems";
// import ProtectedRoute from "./components/ProtectedRoute";
// import IntervwCompo from "./components/interviewpage/IntervwCompo";
// import { AuthProvider } from "./context/authcontext";
// import Problemset from "./components/problemset/Problemset";
import Profile from "./components/Profile/Profile"; // Import Profile component

function App() {
  return (
    // <AuthProvider>
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            {/* <Route path="/callback" element={<LoginCallback />} /> */}
            {/* <Route element={<ProtectedRoute />}> */}
              {/* <Route path="/potd" element={<POTD />} /> */}
              {/* <Route path="/onboard" element={<OnboardForm />} /> */}
              {/* <Route path="/concept-of-the-day" element={<Concept />} /> */}
              {/* <Route path="/IntervwCompo" element={<IntervwCompo />} /> */}
            {/* </Route> */}
            {/* <Route path="/problemset" element={<AllProblems />} /> */}
            {/* <Route path="/problemset1" element={<Problemset />} /> */}
            <Route path="/profile" element={<Profile />} /> {/* New Profile Route */}
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    // </AuthProvider>
  );
}

export default App;
