import LandingPage from "./components/Landing";
import OnboardForm from "./components/on-board-form/OnboardForm";
import LoginCallback from "./components/LoginCallback";
import {RouterProvider,createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" index element={<LandingPage />} />
      <Route path='/onboard' element={<OnboardForm />} />
      <Route path='/callback' index element={<LoginCallback />} />
      </>
    )
  );
  return (
    <div className="App">
      {/* <LandingPage /> */}
      {/* <OnboardForm /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
