"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Send, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const QUICK_PROMPTS = [
  "I'm feeling overwhelmed by my legal case",
  "How can I manage stress during court proceedings?",
  "I need help staying positive",
  "Can you suggest some calming exercises?",
]

export default function CounselCornerPage() {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/wellness-chat" }),
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Welcome to The Counsel Corner. I understand that dealing with legal matters can be incredibly stressful and emotionally draining.\n\nThis is a safe space where you can share what's on your mind. There's no rush, no judgment - just a calm conversation.\n\nHow are you feeling today?",
          },
        ],
      },
    ],
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  // Helper to get text from message parts
  const getMessageText = (message: typeof messages[0]) => {
    if (!message.parts || !Array.isArray(message.parts)) return ""
    return message.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("")
  }

  return (
    <div className="flex h-full flex-col p-3 sm:p-4 md:p-6 animate-fade-in">
      {/* Header - Fixed */}
      <div className="mb-3 sm:mb-4 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-[#d4af37]" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">The Counsel Corner</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          A safe space for emotional support during challenging legal times
        </p>
      </div>

      {/* Chat Card - Flexible height */}
      <Card className="flex flex-1 flex-col overflow-hidden border-[#d4af37]/30 min-h-0">
        <CardHeader className="border-b border-[#d4af37]/20 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30">
              <Heart className="h-6 w-6 text-[#d4af37]" />
            </div>
            <div>
              <CardTitle className="text-lg">Mental Support Companion</CardTitle>
              <CardDescription>Here to listen and support your wellbeing</CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Messages - Scrollable */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 min-h-0"
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30">
                    <Bot className="h-4 w-4 text-[#d4af37]" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3",
                    message.role === "user"
                      ? "bg-[#d4af37] text-black"
                      : "bg-muted border border-[#d4af37]/20"
                  )}
                >
                  <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">{getMessageText(message)}</p>
                </div>
                {message.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30">
                    <User className="h-4 w-4 text-[#d4af37]" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30">
                  <Bot className="h-4 w-4 text-[#d4af37]" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3 border border-[#d4af37]/20">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#d4af37] [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#d4af37] [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#d4af37]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Fixed at bottom */}
        <CardContent className="border-t border-[#d4af37]/20 p-4 shrink-0 bg-card">
          {messages.length <= 1 && (
            <div className="mb-3 sm:mb-4">
              <p className="mb-2 text-xs sm:text-sm text-muted-foreground">Share what&apos;s on your mind...</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    size="sm"
                    className="border-[#d4af37]/30 text-[10px] sm:text-xs hover:bg-[#d4af37]/10 hover:border-[#d4af37] h-7 sm:h-8 px-2 sm:px-3"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    <Sparkles className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#d4af37]" />
                    <span className="truncate max-w-[120px] sm:max-w-none">{prompt}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share what's on your mind..."
              className="flex-1 border-[#d4af37]/30 focus:border-[#d4af37] focus-visible:ring-[#d4af37]/50"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#d4af37] text-black hover:bg-[#c4a030]"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send Message</span>
            </Button>
          </form>

          <p className="mt-3 text-xs text-center text-muted-foreground">
            This assistant provides emotional support only and is not a replacement for professional mental health care.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
