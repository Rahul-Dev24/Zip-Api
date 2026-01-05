import { currentUser } from '@/module/authentication/actions'
import Header from '@/module/layout/components/header'
import { initializeWorkspace } from '@/module/workspaces/actions'
import React from 'react'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {

    const workspace = await initializeWorkspace();
    const user = await currentUser();
    return (
        <>
            {/* @ts-ignore */}
            <Header user={user} />
            <main className='max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden' >
                <div className='flex w-full h-full' >
                    <div className='w-12 border' >
                        tab left pannel
                    </div>
                    <div className='flex-1 ' >
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}

export default RootLayout
