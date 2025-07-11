"use client"

import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export const Navbar = () => {
  const { setTheme, theme } = useTheme()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-x-2">
          <span className="font-bold">Lovable Clone</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}
