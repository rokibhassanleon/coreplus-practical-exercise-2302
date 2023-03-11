import { useState, useEffect } from "react";
import { getSupervisorPractitioners } from './services/PractitionerService'
import "./app.css";

type resultProps = {
  id: number;
  name: string;
};


function App() {
  const data = getSupervisorPractitioners()

  if (data.length === 0) return null;

  return (
    <div className="h-screen w-full appshell">
      <div className="header flex flex-row items-center p-2 bg-primary shadow-sm">
        <p className="font-bold text-lg">coreplus</p>
      </div>
      <div className="supervisors">
        Supervisor practitioners
        <ul>
          {
            data.map(item =>
              <li key={item.id}>{item.name}</li>
            )
          }
        </ul>
      </div>
      <div className="praclist">Remaining Practitioners</div>
      <div className="pracinfo">Practitioner Report UI</div>
    </div>
  );
}

export default App;
