"use client"

import { useState, useRef } from "react"
import { useCompletion } from "@ai-sdk/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Scale, AlertTriangle, Sparkles, Loader2, FileText, Upload, X } from "lucide-react"

export default function CaseInsightEnginePage() {
  const [caseDescription, setCaseDescription] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { complete, completion, isLoading, error } = useCompletion({
    api: "/api/analyze-case",
    streamProtocol: "text",
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleAnalyze = async () => {
    if (!caseDescription.trim()) return

    let fullDescription = caseDescription
    if (uploadedFiles.length > 0) {
      fullDescription += `\n\n[User has uploaded ${uploadedFiles.length} document(s): ${uploadedFiles.map(f => f.name).join(", ")}]`
    }

    await complete(fullDescription)
  }

  return (
    <div className="p-3 sm:p-4 md:p-8 animate-fade-in overflow-y-auto">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-[#d4af37]" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Case Insight Engine</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          AI-powered legal analysis to help you understand your situation
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card className="border-[#d4af37]/30 hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#d4af37]" />
              <CardTitle>Describe Your Legal Problem</CardTitle>
            </div>
            <CardDescription>
              Provide details about your situation for comprehensive analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe your legal problem in detail..."
              value={caseDescription}
              onChange={(e) => setCaseDescription(e.target.value)}
              rows={10}
              className="border-[#d4af37]/30 focus:border-[#d4af37] resize-none"
            />

            {/* Document Upload Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Upload Legal Documents (Optional)</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-[#d4af37]/30 hover:bg-[#d4af37]/10"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload PDF
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-[#d4af37]/10 px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#d4af37]" />
                        <span className="truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0 hover:bg-destructive/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !caseDescription.trim()}
              className="w-full bg-[#d4af37] text-black hover:bg-[#c4a030] font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Case...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Case
                </>
              )}
            </Button>

            <div className="flex items-start gap-2 rounded-lg bg-[#d4af37]/10 p-3 text-sm border border-[#d4af37]/20">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
              <p className="text-muted-foreground">
                This AI-generated analysis is intended for general guidance only. It should not be considered as legal advice or a substitute for consultation with a qualified legal professional.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#d4af37]/30 hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-[#d4af37]" />
              <CardTitle>Analysis Results</CardTitle>
            </div>
            <CardDescription>
              Comprehensive AI-generated insights for your case
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="rounded-lg bg-destructive/10 p-4 text-destructive border border-destructive/20">
                Error analyzing case. Please try again.
              </div>
            )}

            {!completion && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Scale className="mb-4 h-16 w-16 text-muted-foreground/50" />
                <p className="text-lg font-medium">No Analysis Yet</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Describe your case and click Analyze to receive AI insights
                </p>
              </div>
            )}

            {isLoading && !completion && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="mb-4 h-12 w-12 animate-spin text-[#d4af37]" />
                <p className="text-muted-foreground">Analyzing your case...</p>
                <p className="text-sm text-muted-foreground/70 mt-1">This may take a moment</p>
              </div>
            )}

            {completion && (
              <div className="prose prose-sm dark:prose-invert max-w-none max-h-[600px] overflow-y-auto">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {completion}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
