import { useState, useEffect } from "react";
import "./app.css";

type resultProps = {
  id: number;
  name: string;
};


function App() {
  const [result, setResult] = useState<resultProps[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://localhost:7091/practitioners/supervisors", {
        method: "GET"
      });
      const jsonData = await data.json();
      setResult(jsonData);
    };

    api();
  }, []);

  return (
    <div className="h-screen w-full appshell">
      <div className="header flex flex-row items-center p-2 bg-primary shadow-sm">
        <p className="font-bold text-lg">coreplus</p>
      </div>
      <div className="supervisors">Supervisor practitioners</div>
      <div className="praclist">Remaining Practitioners</div>
      <div className="pracinfo">Practitioner Report UI</div>
    </div>
  );
}

export default App;
