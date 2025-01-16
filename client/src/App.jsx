import LandingPage from "./components/mainpage/Landing";
import OnboardForm from "./components/on-board-form/OnboardForm";
import LoginCallback from "./components/LoginCallback";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Navbar from "./components/mainpage/Navbar";
import Footer from "./components/mainpage/Footer";
import POTD from "./components/potdpage/potd";
import Concept from "./components/potdpage/concept";
import AllProblems from "./components/problemset/AllProblems";
import Problemset from "./components/problemset/Problemset";
// import { get } from "mongoose";

function App() {
  const token = localStorage.getItem("token");
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route index element={<LandingPage />} />
          <Route path="potd" element={<POTD />} />
          <Route path="onboard" element={<OnboardForm />} />
          <Route path="callback" element={<LoginCallback />} />
          <Route path="concept-of-the-day" element={<Concept />} />
          <Route path="/problemset" element={<AllProblems />} />
          <Route path="/problemset1" element={<Problemset />} />
         </Route>
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
