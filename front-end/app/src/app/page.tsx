import Link from "next/link"
import { Button } from "@/components/ui/button"
import type {Metadata} from "next";

export default function Home() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-playfair)]">Welcome</h1>
                    <p className="text-muted-foreground">Choose an option to get started</p>
                </div>

                <div className="space-y-4">
                    <Link href="/login" className="block">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Login</Button>
                    </Link>

                    <Link href="/signup" className="block">
                        <Button
                            variant="outline"
                            className="w-full border-accent text-accent hover:bg-primary/90  text-primary-foreground bg-black"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

