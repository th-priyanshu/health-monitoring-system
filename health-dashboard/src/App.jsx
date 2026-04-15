import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Database, HardDrive, Cpu, RefreshCw } from 'lucide-react';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      // Backend (Port 3000) se data fetch karna
     const response = await axios.get(`https://health-checker-api-1zpi.onrender.com/health?t=${Date.now()}`);
      setData(response.data);
    } catch (error) {
      console.error("Backend connection failed", error);
      setData({ status: "DOWN", details: { mongodb: "DOWN", customShell: "DOWN" } });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000); // Har 10 sec mein refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">System Health Dashboard</h1>
          <button onClick={fetchHealth} className="p-2 bg-white rounded-full shadow hover:bg-slate-50">
            <RefreshCw className={loading ? 'animate-spin' : ''} />
          </button>
        </header>

        {/* Overall Status Card */}
        <div className={`p-8 rounded-2xl mb-8 shadow-lg text-white ${data?.status === 'HEALTHY' ? 'bg-green-500' : 'bg-red-500'}`}>
          <div className="flex items-center gap-4">
            <Activity size={48} />
            <div>
              <p className="opacity-80 uppercase text-xs font-bold tracking-widest">Current Status</p>
              <h2 className="text-4xl font-black">{data?.status || 'LOADING...'}</h2>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between">
             <div className="flex items-center gap-3"><Database className="text-blue-500" /> <b>MongoDB</b></div>
             <span className={data?.details?.mongodb === 'UP' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{data?.details?.mongodb}</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between">
             <div className="flex items-center gap-3"><Cpu className="text-purple-500" /> <b>Custom Check</b></div>
             <span className={data?.details?.customShell === 'UP' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{data?.details?.customShell}</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between text-slate-600">
             <div className="flex items-center gap-3"><Activity /> <b>Memory</b></div>
             <span>{data?.details?.memory || '0%'}</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between text-slate-600">
             <div className="flex items-center gap-3"><HardDrive /> <b>Disk Usage</b></div>
             <span>{data?.details?.disk || '0%'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;