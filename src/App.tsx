import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Terminal, 
  Lock, 
  Bug, 
  Activity, 
  Download, 
  AlertTriangle, 
  ChevronRight,
  X,
  RefreshCw,
  Cpu,
  Globe,
  Database,
  Search,
  LayoutDashboard,
  FileCode,
  History,
  Settings,
  Zap,
  Radio,
  Eye,
  Server,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type SimulationType = 'RAT' | 'Ransomware' | 'Virus' | null;
type ViewType = 'dashboard' | 'lab' | 'payloads' | 'logs';

interface LogEntry {
  timestamp: string;
  message: string;
}

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 group ${active ? 'bg-cyber-accent/10 text-cyber-accent border-r-2 border-cyber-accent' : 'text-cyber-muted hover:bg-cyber-surface hover:text-cyber-text'}`}
  >
    <Icon size={20} className={active ? 'text-cyber-accent' : 'group-hover:text-cyber-text'} />
    <span className="text-sm font-medium tracking-wide uppercase">{label}</span>
  </button>
);

const StatWidget = ({ label, value, icon: Icon, colorClass = "text-cyber-accent" }: { label: string, value: string, icon: any, colorClass?: string }) => (
  <div className="cyber-panel p-4 flex items-center gap-4">
    <div className={`p-2 rounded bg-black/40 border border-cyber-border ${colorClass}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-cyber-muted font-bold">{label}</p>
      <p className="text-lg font-mono font-bold">{value}</p>
    </div>
  </div>
);

const RATSimulation = ({ steps }: { steps: string[] }) => {
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let stepIdx = 0;
    let charIdx = 0;
    
    const typeNextChar = () => {
      if (stepIdx < steps.length) {
        const fullStep = steps[stepIdx];
        if (charIdx < fullStep.length) {
          setCurrentLine(prev => prev + fullStep[charIdx]);
          charIdx++;
          setTimeout(typeNextChar, Math.random() * 30 + 10);
        } else {
          setVisibleSteps(prev => [...prev, fullStep]);
          setCurrentLine("");
          charIdx = 0;
          stepIdx++;
          setTimeout(typeNextChar, 600);
        }
      }
    };

    typeNextChar();
  }, [steps]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleSteps, currentLine]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <Radio size={14} className="text-cyber-danger animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyber-danger">Remote Session Active</span>
        </div>
        <span className="text-[10px] font-mono text-cyber-muted">Target: 192.168.1.105</span>
      </div>
      
      <div ref={scrollRef} className="flex-grow bg-black/60 rounded border border-cyber-border p-4 font-mono text-[13px] overflow-y-auto custom-scrollbar">
        {visibleSteps.map((step, idx) => (
          <div key={idx} className="mb-2">
            <span className="text-cyber-success mr-2">root@remote:~$</span>
            <span className="text-cyber-text">{step}</span>
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-cyber-success mr-2">root@remote:~$</span>
          <span className="text-cyber-text">{currentLine}</span>
          <span className="terminal-cursor" />
        </div>
      </div>
    </div>
  );
};

const RansomwareSimulation = ({ warning, timer: initialTimer }: { warning: string, timer: number }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTimer);
  const [files, setFiles] = useState<string[]>([
    "document_01.pdf", "image_2023.jpg", "database_backup.sql", "passwords.txt", "project_final.zip",
    "financial_report.xlsx", "client_list.csv", "private_key.pem", "source_code.zip", "browser_history.db"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [progress]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
      <div className="flex flex-col justify-center space-y-6">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-center"
        >
          <AlertTriangle className="text-cyber-danger mx-auto mb-4" size={64} />
          <h2 className="text-cyber-danger font-bold text-3xl uppercase tracking-tighter glitch-text">{warning}</h2>
          <p className="text-xs text-cyber-muted mt-2 uppercase tracking-widest">RSA-4096 & AES-256 Hybrid Encryption Active</p>
        </motion.div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
            <span className="text-cyber-danger">Encryption Progress</span>
            <span className="text-cyber-danger">{progress}%</span>
          </div>
          <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-cyber-danger/20">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-cyber-danger shadow-[0_0_15px_rgba(255,62,62,0.6)]"
            />
          </div>
        </div>

        <div className="bg-black/40 p-6 rounded-xl border border-cyber-danger/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cyber-danger/5 animate-pulse" />
          <p className="text-[10px] text-cyber-muted uppercase tracking-widest mb-2 relative z-10">Time Remaining for Decryption Key</p>
          <p className="text-5xl font-mono font-bold text-cyber-danger tracking-tighter relative z-10">{formatTime(timeLeft)}</p>
          <div className="mt-4 flex justify-center gap-4 relative z-10">
            <button className="px-4 py-2 bg-cyber-danger text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-cyber-danger/80 transition-colors">Buy Decryptor</button>
            <button className="px-4 py-2 border border-cyber-danger/50 text-cyber-danger text-[10px] font-bold uppercase tracking-widest rounded hover:bg-cyber-danger/10 transition-colors">Contact Support</button>
          </div>
        </div>
      </div>

      <div className="bg-black/40 rounded-xl border border-cyber-border p-6 flex flex-col h-full">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyber-muted mb-4 flex items-center gap-2">
          <Database size={14} />
          Encrypted File System
        </h3>
        <div className="flex-grow space-y-2 font-mono text-[11px] overflow-y-auto custom-scrollbar pr-2">
          {files.map((file, i) => (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="flex items-center justify-between p-2 border-b border-cyber-border/30 group hover:bg-cyber-danger/5 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FileCode size={14} className={progress > (i + 1) * 10 ? "text-cyber-danger" : "text-cyber-accent"} />
                <span className={progress > (i + 1) * 10 ? "text-cyber-danger/80" : "text-cyber-text"}>
                  {file}{progress > (i + 1) * 10 ? ".crypt" : ""}
                </span>
              </span>
              <span className={`text-[9px] font-bold uppercase ${progress > (i + 1) * 10 ? "text-cyber-danger" : "text-cyber-success"}`}>
                {progress > (i + 1) * 10 ? "Locked" : "Safe"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VirusSimulation = () => {
  const [nodes, setNodes] = useState<{id: number, infected: boolean, x: number, y: number}[]>([]);
  const [connections, setConnections] = useState<{from: number, to: number}[]>([]);
  
  useEffect(() => {
    const initialNodes = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      infected: i === 0, // Start with one infected
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    }));
    setNodes(initialNodes);

    const initialConnections: {from: number, to: number}[] = [];
    for (let i = 0; i < initialNodes.length; i++) {
      const numConns = Math.floor(Math.random() * 2) + 1;
      for (let j = 0; j < numConns; j++) {
        const target = Math.floor(Math.random() * initialNodes.length);
        if (target !== i) initialConnections.push({ from: i, to: target });
      }
    }
    setConnections(initialConnections);

    const interval = setInterval(() => {
      setNodes(prev => {
        const next = [...prev];
        const infectedIds = next.filter(n => n.infected).map(n => n.id);
        
        // Find uninfected nodes connected to infected ones
        const targets = connections
          .filter(c => (infectedIds.includes(c.from) && !next[c.to].infected) || (infectedIds.includes(c.to) && !next[c.from].infected))
          .map(c => infectedIds.includes(c.from) ? c.to : c.from);

        if (targets.length > 0) {
          const randomTarget = targets[Math.floor(Math.random() * targets.length)];
          next[randomTarget].infected = true;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyber-muted">Network Propagation Visualization</h3>
          <p className="text-[10px] text-cyber-danger font-mono mt-1">Status: Worm.Win32.Replicator Active</p>
        </div>
        <div className="flex items-center gap-4 text-[10px] uppercase font-bold">
          <span className="flex items-center gap-1 text-cyber-success"><div className="w-2 h-2 bg-cyber-success rounded-full" /> Node Clean</span>
          <span className="flex items-center gap-1 text-cyber-danger"><div className="w-2 h-2 bg-cyber-danger rounded-full" /> Node Compromised</span>
        </div>
      </div>
      
      <div className="flex-grow bg-black/40 rounded-xl border border-cyber-border relative overflow-hidden cyber-grid">
        <svg className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {connections.map((conn, i) => {
            const fromNode = nodes[conn.from];
            const toNode = nodes[conn.to];
            if (!fromNode || !toNode) return null;
            const isInfected = fromNode.infected && toNode.infected;
            return (
              <motion.line 
                key={i}
                x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`} y2={`${toNode.y}%`}
                stroke={isInfected ? "#ff3e3e" : "#1e293b"}
                strokeWidth={isInfected ? "2" : "1"}
                initial={{ opacity: 0 }}
                animate={{ opacity: isInfected ? 0.8 : 0.3 }}
                strokeDasharray={isInfected ? "0" : "4 2"}
              />
            );
          })}
          {nodes.map((node) => (
            <g key={node.id}>
              {node.infected && (
                <motion.circle 
                  cx={`${node.x}%`} cy={`${node.y}%`}
                  r="12"
                  fill="rgba(255, 62, 62, 0.2)"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
              <motion.circle 
                cx={`${node.x}%`} cy={`${node.y}%`}
                r={node.infected ? "6" : "4"}
                fill={node.infected ? "#ff3e3e" : "#00f2ff"}
                filter={node.infected ? "url(#glow)" : "none"}
                animate={{ 
                  scale: node.infected ? [1, 1.2, 1] : 1
                }}
              />
            </g>
          ))}
        </svg>
        <div className="absolute top-4 right-4 bg-black/80 p-3 rounded border border-cyber-danger/30 font-mono text-[10px] text-cyber-danger backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={12} />
            <span className="font-bold">CRITICAL ALERT</span>
          </div>
          [!] VIRAL REPLICATION DETECTED
          <br />
          [!] NODES INFECTED: {nodes.filter(n => n.infected).length} / {nodes.length}
        </div>
      </div>
    </div>
  );
};

const PayloadBuilder = () => {
  const [targetIp, setTargetIp] = useState("192.168.1.100");
  const [port, setPort] = useState("4444");
  const [type, setType] = useState("RAT");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
          <Zap size={20} className="text-cyber-accent" />
          Payload Configuration
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-cyber-muted block mb-2">Payload Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-black/40 border border-cyber-border rounded px-4 py-2 text-sm focus:border-cyber-accent outline-none transition-colors"
            >
              <option value="RAT">Remote Access Trojan (.exe)</option>
              <option value="Ransomware">Ransomware Encryptor (.exe)</option>
              <option value="Virus">Self-Replicating Virus (.exe)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-cyber-muted block mb-2">LHOST (Your IP)</label>
              <input 
                type="text" 
                value={targetIp}
                onChange={(e) => setTargetIp(e.target.value)}
                className="w-full bg-black/40 border border-cyber-border rounded px-4 py-2 text-sm font-mono focus:border-cyber-accent outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-cyber-muted block mb-2">LPORT</label>
              <input 
                type="text" 
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full bg-black/40 border border-cyber-border rounded px-4 py-2 text-sm font-mono focus:border-cyber-accent outline-none"
              />
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={generating}
            className="w-full cyber-button py-3 flex items-center justify-center gap-2"
          >
            {generating ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
            {generating ? "Compiling Payload..." : "Generate & Download Payload"}
          </button>
        </div>
      </div>

      <div className="cyber-panel p-6 bg-cyber-accent/5 border-cyber-accent/20">
        <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Payload Analysis</h4>
        <div className="space-y-4 text-xs">
          <div className="flex justify-between border-b border-cyber-border pb-2">
            <span className="text-cyber-muted">Signature</span>
            <span className="font-mono">SHA-256: 8f2d...4a1b</span>
          </div>
          <div className="flex justify-between border-b border-cyber-border pb-2">
            <span className="text-cyber-muted">Size</span>
            <span className="font-mono">1.24 MB</span>
          </div>
          <div className="flex justify-between border-b border-cyber-border pb-2">
            <span className="text-cyber-muted">Detection Rate</span>
            <span className="text-cyber-danger font-bold">0/64 (FUD)</span>
          </div>
          <div className="pt-4">
            <p className="text-[10px] text-cyber-muted uppercase tracking-widest mb-2">Compiler Output</p>
            <div className="bg-black/60 p-3 rounded font-mono text-[10px] h-32 overflow-y-auto">
              <p className="text-cyber-success">[+] Initializing compiler...</p>
              <p className="text-cyber-success">[+] Injecting shellcode for {targetIp}:{port}</p>
              <p className="text-cyber-success">[+] Obfuscating entry points...</p>
              <p className="text-cyber-success">[+] Packing with UPX...</p>
              <p className="text-cyber-success">[+] Binary ready: payload.exe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewType>('dashboard');
  const [activeSim, setActiveSim] = useState<SimulationType>(null);
  const [simData, setSimData] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs');
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (e) {
      console.error("Failed to fetch logs", e);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const triggerSimulation = async (type: SimulationType) => {
    setLoading(true);
    setActiveSim(type);
    setView('lab');
    try {
      const endpoint = `/api/${type?.toLowerCase()}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setSimData(data);
      fetchLogs();
    } catch (e) {
      console.error("Simulation failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-cyber-bg text-cyber-text cyber-grid">
      <div className="scanline" />
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-cyber-border bg-cyber-surface/80 backdrop-blur-xl flex flex-col z-20">
        <div className="p-6 border-b border-cyber-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-cyber-accent/20 p-2 rounded">
              <Shield className="text-cyber-accent" size={24} />
            </div>
            <h1 className="font-bold text-lg tracking-tighter uppercase leading-none">
              Cyber<span className="text-cyber-accent">Lab</span>
              <br />
              <span className="text-[10px] font-medium text-cyber-muted tracking-widest">Ops Center</span>
            </h1>
          </div>
        </div>

        <nav className="flex-grow py-6">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
          <SidebarItem icon={Terminal} label="Active Lab" active={view === 'lab'} onClick={() => setView('lab')} />
          <SidebarItem icon={Zap} label="Payloads" active={view === 'payloads'} onClick={() => setView('payloads')} />
          <SidebarItem icon={History} label="Activity Logs" active={view === 'logs'} onClick={() => setView('logs')} />
        </nav>

        <div className="p-6 border-t border-cyber-border space-y-4">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-cyber-muted">
            <span>System Status</span>
            <span className="text-cyber-success">Secure</span>
          </div>
          <div className="h-1 bg-cyber-border rounded-full overflow-hidden">
            <div className="h-full w-full bg-cyber-success/50" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 z-10">
        {/* Top Header */}
        <header className="h-16 border-b border-cyber-border bg-cyber-surface/50 backdrop-blur-md px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-cyber-muted">
              {view === 'dashboard' && "Command Overview"}
              {view === 'lab' && "Simulation Environment"}
              {view === 'payloads' && "Payload Generation Lab"}
              {view === 'logs' && "System Audit Logs"}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyber-success rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Node: Asia-SE1</span>
            </div>
            <button className="text-cyber-muted hover:text-cyber-accent transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-grow p-8 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bento-grid"
              >
                {/* Stats - Bento Span 3 */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StatWidget label="Active Threats" value="03" icon={AlertTriangle} colorClass="text-cyber-danger" />
                  <StatWidget label="Lab Instances" value="12" icon={Server} />
                  <StatWidget label="Network Load" value="42%" icon={Activity} />
                  <StatWidget label="Security Score" value="98/100" icon={Shield} colorClass="text-cyber-success" />
                </div>

                {/* System Health - Bento Span 4 */}
                <div className="col-span-12 lg:col-span-4 cyber-panel p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-cyber-muted mb-4 flex items-center gap-2">
                      <Activity size={14} className="text-cyber-accent" />
                      System Health
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold">CPU Usage</span>
                        <span className="text-[10px] font-mono text-cyber-accent">24%</span>
                      </div>
                      <div className="h-1 bg-cyber-border rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ width: '24%' }}
                          className="h-full bg-cyber-accent"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold">Memory</span>
                        <span className="text-[10px] font-mono text-cyber-success">4.2GB / 16GB</span>
                      </div>
                      <div className="h-1 bg-cyber-border rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ width: '30%' }}
                          className="h-full bg-cyber-success"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-cyber-success uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-cyber-success rounded-full animate-pulse" />
                    All Systems Operational
                  </div>
                </div>

                {/* Malware Cards - Bento Span 4 each */}
                <div className="col-span-12 lg:col-span-4 cyber-panel p-6 group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent">
                        <Terminal size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-cyber-muted uppercase tracking-widest">Module 01</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">RAT</h3>
                    <p className="text-sm text-cyber-muted mb-6 leading-relaxed">Remote Access Trojan simulation. Demonstrates Remote Code Execution (RCE) and unauthorized control.</p>
                  </div>
                  <button onClick={() => triggerSimulation('RAT')} className="w-full cyber-button">Initialize Simulation</button>
                </div>

                <div className="col-span-12 lg:col-span-4 cyber-panel p-6 group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded bg-cyber-danger/10 border border-cyber-danger/20 text-cyber-danger">
                        <Lock size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-cyber-muted uppercase tracking-widest">Module 02</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Ransomware</h3>
                    <p className="text-sm text-cyber-muted mb-6 leading-relaxed">Encryption-based attack simulation. Visualizes file system locking and cryptographic extortion.</p>
                  </div>
                  <button onClick={() => triggerSimulation('Ransomware')} className="w-full cyber-button border-cyber-danger/30 text-cyber-danger hover:bg-cyber-danger/20 hover:border-cyber-danger">Initialize Simulation</button>
                </div>

                <div className="col-span-12 lg:col-span-4 cyber-panel p-6 group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded bg-cyber-warning/10 border border-cyber-warning/20 text-cyber-warning">
                        <Bug size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-cyber-muted uppercase tracking-widest">Module 03</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Virus</h3>
                    <p className="text-sm text-cyber-muted mb-6 leading-relaxed">Self-replicating malware simulation. Demonstrates host infection and rapid network propagation.</p>
                  </div>
                  <button onClick={() => triggerSimulation('Virus')} className="w-full cyber-button border-cyber-warning/30 text-cyber-warning hover:bg-cyber-warning/20 hover:border-cyber-warning">Initialize Simulation</button>
                </div>

                {/* Recent Logs Preview - Bento Span 12 */}
                <div className="col-span-12 cyber-panel overflow-hidden">
                  <div className="px-6 py-4 border-b border-cyber-border flex items-center justify-between bg-black/20">
                    <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <History size={14} className="text-cyber-accent" />
                      Recent Activity
                    </h3>
                    <button onClick={() => setView('logs')} className="text-[10px] font-bold text-cyber-accent hover:underline uppercase tracking-widest">View All</button>
                  </div>
                  <div className="p-6 space-y-3 font-mono text-xs">
                    {logs.slice(0, 5).map((log, i) => (
                      <div key={i} className="flex gap-4 items-center">
                        <span className="text-cyber-muted shrink-0">{log.match(/\[(.*?)\]/)?.[1]?.split('T')[1]?.split('.')[0] || '00:00:00'}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-border" />
                        <span className="text-cyber-text truncate">{log.split('] ')[1] || log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {view === 'lab' && (
              <motion.div 
                key="lab"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full flex flex-col"
              >
                {!activeSim ? (
                  <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
                    <div className="p-6 rounded-full bg-cyber-accent/5 border border-cyber-accent/20">
                      <Terminal size={64} className="text-cyber-accent/50" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight">No Active Simulation</h3>
                      <p className="text-cyber-muted mt-2">Select a malware module from the dashboard to begin analysis.</p>
                    </div>
                    <button onClick={() => setView('dashboard')} className="cyber-button px-8 py-3">Go to Dashboard</button>
                  </div>
                ) : (
                  <div className="h-full flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button onClick={() => setActiveSim(null)} className="p-2 hover:bg-cyber-surface rounded border border-cyber-border text-cyber-muted hover:text-cyber-text transition-colors">
                          <X size={18} />
                        </button>
                        <div>
                          <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                            {activeSim} Simulation
                            <span className="text-[10px] bg-cyber-accent/10 text-cyber-accent px-2 py-0.5 rounded border border-cyber-accent/20">Active</span>
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => triggerSimulation(activeSim)} className="cyber-button flex items-center gap-2">
                          <RefreshCw size={14} />
                          Restart
                        </button>
                      </div>
                    </div>

                    <div className="flex-grow cyber-panel p-8 bg-black/40 relative">
                      {loading ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4">
                          <RefreshCw className="animate-spin text-cyber-accent" size={48} />
                          <p className="text-cyber-muted font-mono text-sm animate-pulse uppercase tracking-widest">Initializing Lab Environment...</p>
                        </div>
                      ) : (
                        <>
                          {activeSim === 'RAT' && simData && <RATSimulation steps={simData.steps} />}
                          {activeSim === 'Ransomware' && simData && <RansomwareSimulation warning={simData.warning} timer={simData.timer} />}
                          {activeSim === 'Virus' && <VirusSimulation />}
                          <div className="absolute bottom-6 right-8 text-[10px] font-bold text-white bg-cyber-danger px-2 py-1 rounded shadow-lg animate-pulse">
                            SIMULATION ONLY - SAFE ENVIRONMENT
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {view === 'payloads' && (
              <motion.div 
                key="payloads"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <PayloadBuilder />
              </motion.div>
            )}

            {view === 'logs' && (
              <motion.div 
                key="logs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="cyber-panel flex flex-col h-[calc(100vh-12rem)]"
              >
                <div className="px-6 py-4 border-b border-cyber-border flex items-center justify-between bg-black/20">
                  <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <History size={16} className="text-cyber-accent" />
                    Full Audit Trail
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={14} />
                      <input type="text" placeholder="Filter logs..." className="bg-black/40 border border-cyber-border rounded-full pl-9 pr-4 py-1.5 text-xs focus:border-cyber-accent outline-none w-64" />
                    </div>
                    <button onClick={fetchLogs} className="p-2 hover:bg-cyber-border rounded-lg transition-colors text-cyber-muted">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto p-6 font-mono text-xs space-y-4 custom-scrollbar">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-6 group">
                      <span className="text-cyber-muted shrink-0 w-32">{log.match(/\[(.*?)\]/)?.[1] || '00:00:00'}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] h-fit font-bold uppercase ${log.includes('ALERT') ? 'bg-cyber-danger/10 text-cyber-danger border border-cyber-danger/20' : log.includes('SIM') ? 'bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20' : 'bg-cyber-border/30 text-cyber-muted'}`}>
                        {log.includes('ALERT') ? 'Alert' : log.includes('SIM') ? 'Sim' : 'Info'}
                      </span>
                      <span className="text-cyber-text group-hover:text-cyber-accent transition-colors">{log.split('] ')[1] || log}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
