import { auth } from "@/lib/auth"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const result = await auth.api.getSession({
    headers: request.headers,
  })

  if (!result) {
    return Response.json(null)
  }

  return Response.json(result)
}
