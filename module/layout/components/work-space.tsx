"use client";
import { Button } from '@/components/ui/button';
import { Hint } from '@/components/ui/hint';
import { Loader, Plus, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { Separator } from '@/components/ui/separator';
import { useWorkspaces } from '@/module/workspaces/hooks/workspace';
import { useWorkspaceStore } from '../store';
import CreateWorkspace from './create-workspace';


const WorkSpace = () => {

    const { data: workspaces, isLoading } = useWorkspaces();
    const { selectedWorkspace, setSelectedWorkspace } = useWorkspaceStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (workspaces && workspaces.length > 0 && !selectedWorkspace) {
            setSelectedWorkspace(workspaces[0]);
        }
    }, [workspaces, selectedWorkspace, setSelectedWorkspace]);

    if (isLoading) {
        return (
            <Loader className="animate-spin size-4 text-indigo-400" />
        )
    }

    if (!workspaces || workspaces.length === 0) {
        return <div className='text-red-500 font-semibold' >No workspace found</div>;
    }

    return (
        <>
            <Hint label='Change Workspace' >
                <Select
                    value={selectedWorkspace?.id}
                    onValueChange={(id) => {
                        const ws = workspaces.find((w) => w.id === id)
                        if (ws) setSelectedWorkspace(ws)
                    }}
                >
                    <SelectTrigger className="border cursor-pointer border-indigo-400/40 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex items-center gap-2">
                        <User className="size-4 shrink-0 mb-0.5" />
                        <SelectValue
                            placeholder="Select workspace"
                            className="text-sm font-semibold "
                        />
                    </SelectTrigger>

                    <SelectContent className="mt-2">
                        {workspaces.map((ws) => (
                            <SelectItem className='cursor-pointer' key={ws.id} value={ws.id}>
                                {ws.name}
                            </SelectItem>
                        ))}

                        <Separator className="my-1" />

                        {/* Footer */}
                        <div className="px-2 py-1.5 flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground">
                                My Workspaces
                            </span>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Plus className="size-4 cursor-pointer text-indigo-400" />
                            </Button>
                        </div>
                    </SelectContent>
                </Select>

            </Hint>
            <CreateWorkspace isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}

export default WorkSpace
