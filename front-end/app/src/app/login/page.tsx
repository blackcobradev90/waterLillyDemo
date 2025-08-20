"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        console.log("Login attempt:", { email, password })
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="bg-card border-border">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center font-[family-name:var(--font-playfair)]">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-center text-muted-foreground">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-input border-border focus:ring-ring"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-input border-border focus:ring-ring"
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4 mt-4">
                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="text-accent hover:text-accent/80 font-medium underline underline-offset-4"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
