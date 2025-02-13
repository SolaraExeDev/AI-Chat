import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { sessionClaims } = await auth()
  if(sessionClaims){

    const id = sessionClaims.userid
    const username = sessionClaims.username
    console.log(id,username);
    return NextResponse.json({ id, username })
  }
}