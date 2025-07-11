"use client"

import { useTheme } from "next-themes"

export function useCurrentTheme() {
  const { resolvedTheme } = useTheme()
  return resolvedTheme as "light" | "dark" | undefined
}
