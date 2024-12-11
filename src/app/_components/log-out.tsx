"use client"
import { LogOut} from 'lucide-react'
import React from 'react'
import { Button } from '~/components/ui/button'
import { handleSignOut } from '~/server/actions/auth'

function LogOutComponent() {
    return (
        <Button onClick={handleSignOut } variant={"outline"}>Log out <LogOut /></Button>
    )
}

export default LogOutComponent