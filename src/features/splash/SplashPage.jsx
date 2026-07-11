import { useEffect } from "react";
import { useNavigate } from "react-router";

import MobileShell from "../../components/layout/MobileShell";
import SplashBackground from "./components/SplashBackground";
import TopWave from "./components/TopWave";
import SplashLogo from "./components/SplashLogo";
import SplashTagline from "./components/SplashTagline";
import SplashFooter from "./components/SplashFooter";
import SplashLoading from "./components/SplashLoading";

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileShell>
      <SplashBackground>
        <TopWave />
        <SplashLogo />
        <SplashTagline />
        <SplashFooter />
        <SplashLoading />
      </SplashBackground>
    </MobileShell>
  );
}