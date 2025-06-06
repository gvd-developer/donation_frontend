"use client"

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { useState } from "react"
export default function ReactQueryProvider({ children }) {


  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 2,
          staleTime: 60 * 1000,
        }
      }
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
