import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./Landing/Landing";
import Onboarding from "./Onbording/OnBording";
import Auth from "./Auth/Auth";
import Dashboard from "./Dashboard/Dashboard";
import WaitingPage from "./Auth/Waiting-page";
import HowItWorks from "./General/HowItWorks";
import About from "./General/About";
import PageTransition from "./PageTransition";
import Profile from "./Profile/profile";
import MyRoadmap from "./My-Roadmap/My-Roadmap";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Landing />
            </PageTransition>
          }
        />
        <Route
          path="/onboarding"
          element={
            <PageTransition>
              <Onboarding />
            </PageTransition>
          }
        />
        <Route
          path="/Auth"
          element={
            <PageTransition>
              <Auth />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          }
        />
        <Route
          path="/waitingPage"
          element={
            <PageTransition>
              <WaitingPage />
            </PageTransition>
          }
        />
        <Route
          path="/how-it-works"
          element={
            <PageTransition>
              <HowItWorks />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/profile"
          element={
            <PageTransition>
              <Profile />
            </PageTransition>
          }
        />
        <Route
          path="/roadmap"
          element={
            <PageTransition>
              <MyRoadmap />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
