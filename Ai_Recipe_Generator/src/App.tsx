import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Components/Home";
import "./App.css";
import { SkeletonTheme } from "react-loading-skeleton";

export default function App() {
  return (
    <SkeletonTheme baseColor="#212121" highlightColor="#171715">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}
