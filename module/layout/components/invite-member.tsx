import { Button } from '@/components/ui/button'
import { Hint } from '@/components/ui/hint'
import { UserPlus } from 'lucide-react'
import React from 'react'

const InviteMember = () => {
    return (
        <>
            <Hint label='Invite Members' >
                <Button
                    size="icon"
                    className="h-8 w-10 border cursor-pointer border-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 hover:text-emerald-300"
                >
                    <UserPlus className="h-2.5 w-2.5" />
                </Button>
            </Hint>

        </>
    )
}

export default InviteMember
