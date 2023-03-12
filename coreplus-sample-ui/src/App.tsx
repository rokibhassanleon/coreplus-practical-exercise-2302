import SupervisorList from './components/supervisorsList';
import OtherPractitionerList from './components/otherPractitionersList';
import AppointmentReports from './components/report';
import "./app.css";

import React, { useState } from 'react';

function App() {
  const [practitionerId, setPractitionerId] = useState<number>(0);

  const togglePractitioner = (practitioner_id: number) => {
    if (practitionerId === practitioner_id) {
      setPractitionerId(0);
    }
    else {
      setPractitionerId(practitioner_id);
    }
  };

  return (
    <div className="w-full appshell">
      <div className="header flex flex-row items-center p-2 bg-primary shadow-sm">
        <p className="font-bold text-lg">coreplus</p>
      </div>
      <SupervisorList practitionerId={practitionerId} onSupervisorChange={(practitionerId) => togglePractitioner(practitionerId)}/>
      <OtherPractitionerList practitionerId={practitionerId} onOtherChange={(practitionerId) => togglePractitioner(practitionerId)} />
      <AppointmentReports practitionerId={practitionerId} />
    </div>
  );
}

export default App;
