import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Carregando...");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://api-exemple-production.up.railway.app/health");
        if (!res.ok) throw new Error();
        const contentType = res.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          setMessage(data?.message || "o deploy não funcionou");
        } else {
          const text = await res.text();
          setMessage(text || "o deploy não funcionou");
        }
      } catch {
        setMessage("o deploy não funcionou");
      }
    };

    load();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">{message}</div>
    </>
  );
}

export default App;
