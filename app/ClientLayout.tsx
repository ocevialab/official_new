"use client";

import { useEffect, useState } from "react";
import Preloader from "./Components/PreLoader";
import ScrollToTop from "./Components/ScrollToTop";
import LiveNoise from "./Components/LiveNoise";
import ErrorBoundary from "./Components/ErrorBoundary";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Failsafe to stop preloader after 60s
    const timeout = setTimeout(() => {
      setLoading(false);
      console.warn("Preloader timed out after 3 seconds.");
    }, 3000);

    // ✅ Handle JS chunk loading errors
    const onChunkError = (e: ErrorEvent) => {
      if (
        e?.message?.includes("Loading chunk") ||
        e?.filename?.includes(".js")
      ) {
        console.error("Chunk load failure:", e);
        document.body.innerHTML = `
          <div style="color:white;text-align:center;padding-top:30vh;background:black;height:100vh">
            <h2>Connection is too slow or interrupted.</h2>
            <button onclick="location.reload()" style="margin-top:20px;padding:10px 20px;font-size:16px;cursor:pointer;">Retry</button>
          </div>
        `;
      }
    };

    // ✅ Extra: log all client-side errors
    const logRuntimeError = (e: ErrorEvent) => {
      console.error("Runtime Error:", e);
    };

    const logUnhandledPromise = (e: PromiseRejectionEvent) => {
      console.error("Unhandled Promise Rejection:", e.reason);
    };

    window.addEventListener("error", onChunkError);
    window.addEventListener("error", logRuntimeError);
    window.addEventListener("unhandledrejection", logUnhandledPromise);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("error", onChunkError);
      window.removeEventListener("error", logRuntimeError);
      window.removeEventListener("unhandledrejection", logUnhandledPromise);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <LiveNoise />
      {loading ? <Preloader onFinish={() => setLoading(false)} /> : children}
    </ErrorBoundary>
  );
}
