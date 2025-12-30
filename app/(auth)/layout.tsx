import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {

    let session;
    headers()?.then((header: any) => {
        session = auth.api.getSession({
            headers: header
        })
    })

    if (session) {
        return redirect("/")
    }

    return (
        <>{children}</>
    )
}

export default AuthLayout
