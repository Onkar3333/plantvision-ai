import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Hash, Users, Search, Image, Smile, Plus, ChevronDown } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";

const CommunityChat = () => {
  const [activeRoom, setActiveRoom] = useState("general");
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const rooms = [
    { id: "general", name: "General", members: 1234, unread: 5 },
    { id: "beginners", name: "Beginners", members: 892, unread: 0 },
    { id: "experts", name: "Ask Experts", members: 456, unread: 2 },
    { id: "diseases", name: "Disease Help", members: 678, unread: 0 },
    { id: "trading", name: "Plant Trading", members: 345, unread: 0 },
  ];

  const messages = [
    {
      id: 1,
      user: "PlantMom2024",
      avatar: "🌸",
      message: "Just propagated my first monstera cutting! So excited!",
      time: "10:30 AM",
      isMe: false,
    },
    {
      id: 2,
      user: "GreenThumb_Joe",
      avatar: "🌿",
      message: "Congrats! Make sure to keep the humidity high for the first few weeks.",
      time: "10:32 AM",
      isMe: false,
    },
    {
      id: 3,
      user: "You",
      avatar: "🪴",
      message: "That's awesome! What soil mix did you use?",
      time: "10:35 AM",
      isMe: true,
    },
    {
      id: 4,
      user: "PlantMom2024",
      avatar: "🌸",
      message: "I used a mix of perlite, orchid bark, and regular potting soil. Seems to be working great so far!",
      time: "10:37 AM",
      isMe: false,
    },
    {
      id: 5,
      user: "Dr.Botanist",
      avatar: "🧑‍🔬",
      message: "Great choice! Adding some sphagnum moss can help retain moisture while still providing drainage.",
      time: "10:40 AM",
      isMe: false,
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen pb-0">
      <AnimatedBackground />
      <Header showBack title="Community" />

      <main className="container px-4 pt-4 h-[calc(100vh-80px)] flex flex-col">
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Sidebar - Rooms */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex flex-col w-64 glass-card overflow-hidden"
          >
            <div className="p-4 border-b border-glass-border">
              <h2 className="font-space font-semibold text-foreground mb-3">Chat Rooms</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted/50 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`w-full p-3 rounded-xl mb-1 text-left transition-all ${
                    activeRoom === room.id
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Hash className={`h-4 w-4 ${
                        activeRoom === room.id ? "text-primary" : "text-muted-foreground"
                      }`} />
                      <span className={`font-medium ${
                        activeRoom === room.id ? "text-primary" : "text-foreground"
                      }`}>
                        {room.name}
                      </span>
                    </div>
                    {room.unread > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        {room.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{room.members} members</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 glass-card flex flex-col overflow-hidden"
          >
            {/* Room Header */}
            <div className="p-4 border-b border-glass-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-space font-semibold text-foreground capitalize">
                    {activeRoom}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {rooms.find(r => r.id === activeRoom)?.members} members online
                  </p>
                </div>
              </div>
              <button className="md:hidden p-2 rounded-lg bg-muted/50">
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl shrink-0">
                    {msg.avatar}
                  </div>
                  <div className={`max-w-[70%] ${msg.isMe ? "items-end" : ""}`}>
                    <div className={`flex items-center gap-2 mb-1 ${msg.isMe ? "flex-row-reverse" : ""}`}>
                      <span className="font-medium text-foreground text-sm">{msg.user}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      msg.isMe 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-muted/50 text-foreground rounded-tl-sm"
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-glass-border">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Plus className="h-5 w-5 text-muted-foreground" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Image className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Smile className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="p-3 rounded-xl bg-primary text-primary-foreground shadow-glow-sm"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CommunityChat;
