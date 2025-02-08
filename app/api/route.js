import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { sessionClaims } = await auth()

  const id = sessionClaims.userid

  const username = sessionClaims.username
  return NextResponse.json({ id, username })
}