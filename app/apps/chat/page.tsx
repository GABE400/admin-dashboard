"use client";

import * as React from "react";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  MoreVertical,
  ChevronLeft,
  Circle,
  FileText,
  Image as ImageIcon,
  UserCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/app/utils";

interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

interface ChatThread {
  id: string;
  userName: string;
  userAvatar: string;
  userEmail: string;
  userCompany: string;
  userBio: string;
  isOnline: boolean;
  unreadCount: number;
  lastMessage: string;
  time: string;
  messages: Message[];
}

const initialThreads: ChatThread[] = [
  {
    id: "th-1",
    userName: "Alex Rivera",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=64",
    userEmail: "alex.r@aether.com",
    userCompany: "Acme Corp",
    userBio: "Lead DevOps Specialist. Managing multi-region AWS deployments and cloud scaling architectures.",
    isOnline: true,
    unreadCount: 0,
    lastMessage: "I've checked the API metrics and they look incredibly stable now. Thanks!",
    time: "10:42 AM",
    messages: [
      { id: "m-1", sender: "them", text: "Hey! Are the server analytics updates deployed yet?", time: "10:30 AM" },
      { id: "m-2", sender: "me", text: "Yes, they went live around 10:15 AM on the staging environment.", time: "10:32 AM" },
      { id: "m-3", sender: "them", text: "Excellent! Let me run the regression check and monitor CPU metrics.", time: "10:35 AM" },
      { id: "m-4", sender: "me", text: "Keep me posted. The DB shards look healthy as well.", time: "10:38 AM" },
      { id: "m-5", sender: "them", text: "I've checked the API metrics and they look incredibly stable now. Thanks!", time: "10:42 AM" },
    ],
  },
  {
    id: "th-2",
    userName: "Sarah Chen",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=64",
    userEmail: "s.chen@aether.com",
    userCompany: "Stark Industries",
    userBio: "Director of Application Security. Focused on access control list checks, MFA architectures, and audits.",
    isOnline: true,
    unreadCount: 2,
    lastMessage: "Are we still on for the security sync later today at 4?",
    time: "9:15 AM",
    messages: [
      { id: "m-6", sender: "me", text: "Hi Sarah, did you get the audit logs I exported yesterday?", time: "9:00 AM" },
      { id: "m-7", sender: "them", text: "Got them, thanks. I spotted some anomalies in the third block.", time: "9:12 AM" },
      { id: "m-8", sender: "them", text: "Are we still on for the security sync later today at 4?", time: "9:15 AM" },
    ],
  },
  {
    id: "th-3",
    userName: "Marcus Vance",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64",
    userEmail: "m.vance@aether.com",
    userCompany: "Lex Corp",
    userBio: "Senior Database Administrator. Managing PostgreSQL replication clusters and database backups.",
    isOnline: false,
    unreadCount: 0,
    lastMessage: "The database backup file download failed again. Can you verify the sharding key?",
    time: "Yesterday",
    messages: [
      { id: "m-9", sender: "them", text: "The database backup file download failed again. Can you verify the sharding key?", time: "5:30 PM" },
    ],
  },
];

export default function ChatPage() {
  const [threads, setThreads] = React.useState<ChatThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = React.useState("th-1");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [messageText, setMessageText] = React.useState("");
  const [showDetailPane, setShowDetailPane] = React.useState(true);
  
  // Mobile active thread view state
  const [isMobileThreadActive, setIsMobileThreadActive] = React.useState(false);

  const activeThread = React.useMemo(() => {
    return threads.find((t) => t.id === activeThreadId) || threads[0];
  }, [threads, activeThreadId]);

  // Search Filter
  const filteredThreads = React.useMemo(() => {
    return threads.filter((t) =>
      t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.userCompany.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [threads, searchQuery]);

  // Mark active thread read on selection
  React.useEffect(() => {
    setThreads((prev) =>
      prev.map((t) => (t.id === activeThreadId ? { ...t, unreadCount: 0 } : t))
    );
  }, [activeThreadId]);

  // Send message handler
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: "me",
      text: messageText,
      time: new Date().toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThread.id) {
          return {
            ...t,
            lastMessage: messageText,
            time: "Just now",
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );

    setMessageText("");

    // Simulate auto response after 2 seconds
    setTimeout(() => {
      const responseMsg: Message = {
        id: `m-resp-${Date.now()}`,
        sender: "them",
        text: `Mock Automatic Reply: Got your message: "${messageText}". Thanks!`,
        time: new Date().toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === activeThread.id) {
            return {
              ...t,
              lastMessage: responseMsg.text,
              time: "Just now",
              messages: [...t.messages, responseMsg],
            };
          }
          return t;
        })
      );
    }, 2000);
  };

  const messageEndRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll to message bottom
  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread.messages]);

  return (
    <Card className="border border-border/80 h-[calc(100vh-140px)] flex bg-card overflow-hidden">
      
      {/* ================= LEFT COLUMN: CONVERSATION LIST ================= */}
      <div
        className={cn(
          "w-full md:w-80 flex flex-col border-r border-border/80 shrink-0",
          isMobileThreadActive ? "hidden md:flex" : "flex"
        )}
      >
        {/* Search header */}
        <div className="p-4 border-b border-border/60 space-y-3 bg-muted/5">
          <h2 className="text-sm font-bold text-foreground">Conversations Hub</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-4 text-xs focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/40 p-2 space-y-1">
          {filteredThreads.map((th) => (
            <button
              key={th.id}
              onClick={() => {
                setActiveThreadId(th.id);
                setIsMobileThreadActive(true);
              }}
              className={cn(
                "flex items-start gap-3 w-full p-3 rounded-lg text-left transition-all duration-200 cursor-pointer",
                th.id === activeThread.id
                  ? "bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary rounded-l-none"
                  : "hover:bg-secondary/40"
              )}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={th.userAvatar} alt={th.userName} />
                  <AvatarFallback className="text-xs font-bold">{th.userName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {th.isOnline && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                )}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-foreground truncate">{th.userName}</h4>
                  <span className="text-[9px] text-muted-foreground whitespace-nowrap">{th.time}</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-semibold block leading-none truncate">
                  {th.userCompany}
                </span>
                <p className="text-[11px] text-muted-foreground/80 truncate mt-1">
                  {th.lastMessage}
                </p>
              </div>
              {th.unreadCount > 0 && (
                <Badge className="h-5 min-w-5 justify-center flex text-[9px] rounded-full shrink-0 font-bold px-1 animate-pulse">
                  {th.unreadCount}
                </Badge>
              )}
            </button>
          ))}
          {filteredThreads.length === 0 && (
            <p className="text-center text-xs text-muted-foreground p-8">No conversation matched.</p>
          )}
        </div>
      </div>

      {/* ================= CENTER COLUMN: CONVERSATION PANEL ================= */}
      <div
        className={cn(
          "flex-1 flex flex-col bg-muted/5",
          !isMobileThreadActive ? "hidden md:flex" : "flex"
        )}
      >
        {/* Chat Workspace Header */}
        <div className="h-14 border-b border-border/60 px-4 flex items-center justify-between bg-card shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Back back button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:hidden text-muted-foreground hover:bg-secondary cursor-pointer"
              onClick={() => setIsMobileThreadActive(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="relative">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activeThread.userAvatar} alt={activeThread.userName} />
                <AvatarFallback className="text-xs font-bold">{activeThread.userName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              {activeThread.isOnline && (
                <span className="absolute bottom-0 right-0 h-2.2 w-2.2 rounded-full bg-emerald-500 ring-2 ring-card" />
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold text-foreground leading-none">{activeThread.userName}</h3>
              <span className="text-[9px] text-muted-foreground inline-flex items-center gap-1 mt-1 font-semibold uppercase">
                {activeThread.isOnline ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active online
                  </>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" /> Offline
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => alert("Simulation: Dialing Voice Call...")}>
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => alert("Simulation: Launching Video Meeting...")}>
              <Video className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 cursor-pointer",
                showDetailPane ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setShowDetailPane(!showDetailPane)}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Message bubble stream scroll area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeThread.messages.map((msg) => {
            const isMe = msg.sender === "me";
            return (
              <div key={msg.id} className={cn("flex gap-3 max-w-[85%] sm:max-w-[70%]", isMe ? "ml-auto flex-row-reverse" : "mr-auto")}>
                {!isMe && (
                  <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                    <AvatarImage src={activeThread.userAvatar} alt={activeThread.userName} />
                    <AvatarFallback className="text-[10px] font-bold">{activeThread.userName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="space-y-1">
                  <div
                    className={cn(
                      "p-3 rounded-xl text-xs leading-relaxed",
                      isMe
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-xs shadow-primary/10"
                        : "bg-card text-foreground border border-border/80 rounded-tl-none"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className={cn("text-[9px] text-muted-foreground font-semibold block leading-none mt-1", isMe ? "text-right" : "text-left")}>
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messageEndRef} />
        </div>

        {/* Send message text footer input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-border/60 bg-card flex items-center gap-2 shrink-0">
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0 cursor-pointer" onClick={() => alert("Mock attachment handler triggered.")}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            type="text"
            placeholder="Type your message details here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 h-9 rounded-lg border border-border bg-background px-3 text-xs focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0 cursor-pointer" onClick={() => alert("Mock emoji panel triggered.")}>
            <Smile className="h-4 w-4" />
          </Button>
          <Button type="submit" size="icon" className="h-9 w-9 rounded-lg shrink-0 cursor-pointer" disabled={!messageText.trim()}>
            <Send className="h-4.5 w-4.5" />
          </Button>
        </form>
      </div>

      {/* ================= RIGHT COLUMN: CONVERSATION DETAILS ================= */}
      {showDetailPane && (
        <div
          className={cn(
            "w-72 border-l border-border/80 flex flex-col shrink-0 bg-card overflow-y-auto transition-all animate-in slide-in-from-right duration-200",
            !isMobileThreadActive ? "hidden lg:flex" : "hidden lg:flex"
          )}
        >
          <div className="p-6 flex flex-col items-center text-center space-y-4 border-b border-border/60">
            <Avatar className="h-16 w-16 shadow-md border-2 border-primary/10">
              <AvatarImage src={activeThread.userAvatar} alt={activeThread.userName} />
              <AvatarFallback className="text-sm font-bold">{activeThread.userName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-foreground">{activeThread.userName}</h3>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">
                {activeThread.userCompany}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-normal font-medium italic">
              "{activeThread.userBio}"
            </p>
          </div>

          <div className="p-4 space-y-5 text-xs text-foreground">
            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="font-bold text-zinc-500 uppercase text-[9px] tracking-wider">Contact Info</h4>
              <div className="space-y-2 leading-tight">
                <div>
                  <span className="text-[10px] text-muted-foreground block">Email Address</span>
                  <span className="font-semibold text-foreground/90">{activeThread.userEmail}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block">Assigned Tenant Org</span>
                  <span className="font-semibold text-foreground/90">{activeThread.userCompany}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Shared Files list */}
            <div className="space-y-3">
              <h4 className="font-bold text-zinc-500 uppercase text-[9px] tracking-wider">Shared Assets</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg border border-border bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-primary/10 text-primary flex items-center justify-center">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-foreground leading-none truncate">audit_logs_v4.json</p>
                      <span className="text-[8px] text-muted-foreground">42 KB · May 29</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg border border-border bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-foreground leading-none truncate">cpu_spikes_report.png</p>
                      <span className="text-[8px] text-muted-foreground">1.2 MB · Jun 01</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </Card>
  );
}
