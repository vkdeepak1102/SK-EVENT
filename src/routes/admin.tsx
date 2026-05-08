import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CalendarRange, Users, Image as ImageIcon, FileText, UploadCloud, Download, MessageSquare } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { saveUploadedImage, getContactMessages, ContactMessage } from "@/lib/db";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin — SK Atelier" }, { name: "description", content: "SK admin control panel." }] }),
});

const tiles = [
  { I: CalendarRange, l: "Manage Events", c: "24 active" },
  { I: Users, l: "Manage Users", c: "1,284 members" },
  { I: ImageIcon, l: "Gallery Uploads", c: "142 pending" },
  { I: FileText, l: "Blog Control", c: "8 drafts" },
];



function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem("adminAuth") === "true");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [cat, setCat] = useState("Weddings");
  const [h, setH] = useState<"tall" | "med" | "short">("med");
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      getContactMessages().then(setMessages).catch(console.error);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === "SKEVENT" && password === "SKEVENT-ADMIN") {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleExportCSV = () => {
    if (messages.length === 0) return alert("No messages to export.");
    const headers = ["Date", "Name", "Email", "Phone", "Event Type", "Message"];
    const rows = messages.map(m => [
      new Date(m.timestamp).toLocaleString(),
      `"${m.name}"`,
      `"${m.email}"`,
      `"${m.phone}"`,
      `"${m.type}"`,
      `"${m.message.replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sk_event_inquiries.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInput.current?.files?.length) return;
    
    setUploading(true);
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      await saveUploadedImage({
        id: crypto.randomUUID(),
        src: base64String,
        cat,
        h,
        timestamp: Date.now()
      });
      setUploading(false);
      alert("Image uploaded to gallery successfully!");
      if (fileInput.current) fileInput.current.value = "";
    };
    
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <PageShell>
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <Reveal>
            <div className="glass rounded-3xl p-10 border-gold/40 w-full max-w-md">
              <div className="text-center mb-8">
                <p className="text-[10px] tracking-[0.5em] uppercase text-gold">Restricted Access</p>
                <h2 className="mt-2 font-display text-4xl">Admin Login</h2>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-foreground/70">Admin ID</label>
                  <input type="text" value={userId} onChange={e => setUserId(e.target.value)} required className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 font-serif outline-none focus:border-gold focus:shadow-glow" />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-foreground/70">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 font-serif outline-none focus:border-gold focus:shadow-glow" />
                </div>
                {error && <p className="text-red-500 text-sm font-serif">{error}</p>}
                <button type="submit" className="shimmer w-full rounded-full bg-gradient-gold px-6 py-4 text-xs tracking-[0.35em] uppercase text-background shadow-gold mt-4">
                  Enter Atelier
                </button>
              </form>
            </div>
          </Reveal>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="pt-40 pb-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-[11px] tracking-[0.5em] uppercase text-gold">Atelier Control</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Admin Panel</h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {tiles.map((t, i) => (
          <Reveal key={t.l} delay={i * 60}>
            <button className="text-left rounded-2xl border border-border bg-card p-7 hover-lift w-full">
              <t.I className="h-7 w-7 text-gold" />
              <div className="mt-5 font-display text-2xl">{t.l}</div>
              <div className="mt-1 text-[11px] tracking-[0.3em] uppercase text-muted-foreground">{t.c}</div>
            </button>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 mb-12">
        <div className="rounded-3xl border border-border bg-card p-8">
          <div className="flex items-center gap-3 border-b border-border pb-6">
            <UploadCloud className="h-6 w-6 text-gold" />
            <h3 className="font-display text-3xl">Upload to Gallery</h3>
          </div>
          <form onSubmit={handleUpload} className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Select Image</label>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInput} 
                required 
                className="w-full flex h-11 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Category</label>
              <select 
                value={cat} 
                onChange={(e) => setCat(e.target.value)}
                className="w-full flex h-11 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <option value="Weddings">Weddings</option>
                <option value="Yacht Parties">Yacht Parties</option>
                <option value="Birthday Surprise">Birthday Surprise</option>
                <option value="Room Decor">Room Decor</option>
                <option value="Villa Surprise">Villa Surprise</option>
                <option value="Celebrity Events">Celebrity Events</option>
                <option value="Model Shoots">Model Shoots</option>
              </select>
            </div>
            <div className="space-y-2 flex flex-col justify-end">
              <button 
                type="submit" 
                disabled={uploading}
                className="shimmer w-full rounded-md bg-gradient-gold px-5 py-3 text-[11px] font-bold tracking-[0.3em] uppercase text-background shadow-gold disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mb-24">
        <div className="rounded-3xl border border-border bg-card p-8">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-gold" />
              <h3 className="font-display text-3xl">Inquiries</h3>
            </div>
            <button onClick={handleExportCSV} className="flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-gold hover:bg-gold hover:text-background transition-colors">
              <Download className="h-3 w-3" /> Export to CSV
            </button>
          </div>
          
          <div className="mt-6 overflow-x-auto">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground font-serif py-10">No inquiries received yet.</p>
            ) : (
              <table className="w-full text-left font-serif text-sm">
                <thead>
                  <tr className="border-b border-border text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    <th className="pb-3 px-4">Date</th>
                    <th className="pb-3 px-4">Name</th>
                    <th className="pb-3 px-4">Contact</th>
                    <th className="pb-3 px-4">Type</th>
                    <th className="pb-3 px-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m) => (
                    <tr key={m.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 align-top whitespace-nowrap text-xs text-muted-foreground">{new Date(m.timestamp).toLocaleDateString()}</td>
                      <td className="py-4 px-4 align-top font-medium">{m.name}</td>
                      <td className="py-4 px-4 align-top">
                        <div>{m.email}</div>
                        <div className="text-xs text-muted-foreground mt-1">{m.phone}</div>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <span className="bg-gold/20 text-gold px-2 py-1 rounded text-xs">{m.type}</span>
                        <div className="text-xs text-muted-foreground mt-1">For: {m.date}</div>
                      </td>
                      <td className="py-4 px-4 align-top max-w-[300px] truncate" title={m.message}>{m.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

    </PageShell>
  );
}
