import "./app.css";

function App() {
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
