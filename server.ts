import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper to log activity
  const logActivity = (simulation: string) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] SIMULATION: ${simulation} triggered\n`;
    fs.appendFileSync(path.join(__dirname, "logs", "log.txt"), logMessage);
  };

  // API Routes
  app.get("/api/rat", (req, res) => {
    logActivity("RAT");
    res.json({ 
      status: "success", 
      message: "RAT Simulation Initialized",
      steps: [
        "Connecting to remote host...",
        "Authentication success...",
        "Accessing system resources..."
      ]
    });
  });

  app.get("/api/ransomware", (req, res) => {
    logActivity("Ransomware");
    res.json({ 
      status: "success", 
      message: "Ransomware Simulation Initialized",
      warning: "Your files are encrypted (Simulation Only)",
      timer: 3600
    });
  });

  app.get("/api/virus", (req, res) => {
    logActivity("Virus");
    res.json({ 
      status: "success", 
      message: "Virus Simulation Initialized",
      activity: [
        "File corruption detected",
        "CPU spike: 98%",
        "Memory leak detected"
      ]
    });
  });

  app.get("/api/logs", (req, res) => {
    try {
      const logs = fs.readFileSync(path.join(__dirname, "logs", "log.txt"), "utf8");
      res.json({ logs: logs.split("\n").filter(Boolean).reverse().slice(0, 50) });
    } catch (error) {
      res.status(500).json({ error: "Could not read logs" });
    }
  });

  // Serve payloads
  app.use("/payloads", express.static(path.join(__dirname, "payloads")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
