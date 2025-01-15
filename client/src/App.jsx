import LandingPage from "./components/mainpage/Landing";
import OnboardForm from "./components/on-board-form/OnboardForm";
import LoginCallback from "./components/LoginCallback";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Navbar from "./components/mainpage/Navbar";
import Footer from "./components/mainpage/Footer";
import POTD from "./components/potdpage/potd";
import Concept from "./components/potdpage/concept";
import AllProblems from "./components/problemset/AllProblems";
import ProtectedRoute from "./components/ProtectedRoute";

import IntervwCompo from "./components/interviewpage/IntervwCompo";


function App() {
  const token = localStorage.getItem("token");
  console.log(token)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route path="/" element={<Root />}>
          <Route index element={ <LandingPage />} />
          <Route path="/callback" element={<LoginCallback />} />
          <Route element ={<ProtectedRoute/>}>
          <Route path="/potd" element={<POTD />} />
          <Route path="onboard" element={<OnboardForm />} />
          <Route path="concept-of-the-day" element={<Concept />} />
          {/* <Route path="/problemset" element={<AllProblems />} /> */}
          <Route path='/IntervwCompo' element={<IntervwCompo />} />
          </Route>
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
