"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RefreshCw } from 'lucide-react'

interface CaptchaProps {
  onValidate: (isValid: boolean) => void
}

export function Captcha({ onValidate }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState('')
  const [userInput, setUserInput] = useState('')

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(result)
    setUserInput('')
    onValidate(false)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  useEffect(() => {
    const isValid = userInput.length > 0 && userInput === captchaText
    onValidate(isValid)
  }, [userInput, captchaText, onValidate])

  return (
    <div className="space-y-4">
      <Label htmlFor="captcha" className="text-sm font-medium">
        Security Verification
      </Label>
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <div className="h-12 bg-gradient-card border border-border rounded-lg flex items-center justify-center font-mono text-lg font-bold tracking-widest select-none shadow-inner">
            <span className="text-primary drop-shadow-sm">{captchaText}</span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={generateCaptcha}
          className="h-12 w-12 border-border hover:bg-accent"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Refresh CAPTCHA</span>
        </Button>
      </div>
      <Input
        id="captcha"
        type="text"
        placeholder="Enter the code above"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-full"
      />
    </div>
  )
}