"use client";
import { useEffect } from "react";
import { AuthContextProvider } from "@/store/auth-context";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export default function Home() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);
  return (
    <Router>
      <AuthContextProvider>
        <main>
          <div>
            <Header></Header>
            <Body></Body>
            <Footer></Footer>
          </div>
        </main>
      </AuthContextProvider>
    </Router>
  );
}
