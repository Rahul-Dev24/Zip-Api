"use client";
import { Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
} from '@/components/ui/command';



const SearchBar = () => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }
        document.addEventListener('keydown', down);
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <button onClick={() => setOpen(true)}
                className='relative flex flex-1 cursor-text items-center justify-between self-stretch rounded px-4 py-1.5 text-gray-500 transition  hover:text-gray-400 border overflow-hidden'
            >
                <span className='inline-flex flex-1 items-center' >
                    <Search size={16} className='mr-2' />
                    <span className='text-xs text-left' >Search</span>
                </span>
                <span className="flex space-x-1">
                    <kbd className="px-1 py-0.5 mt-0.5 text-xs border rounded">Ctrl</kbd>
                    <kbd className="px-1 py-0.5 mt-0.5 text-xs border rounded">K</kbd>
                </span>
            </button>




            {/* Command Dialog */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <div className="border">
                    <CommandInput
                        placeholder="Type a command or search..."
                        className="bg-transparent border-none text-gray-300 placeholder:text-gray-500"
                    />
                    <CommandList className="">
                        <CommandEmpty className="text-gray-500 py-6 text-center">No results found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem onSelect={() => setOpen(false)} className="text-gray-500 cursor-pointer">
                                <span>Pre-request Script</span>
                            </CommandItem>
                            <CommandItem onSelect={() => setOpen(false)} className="text-gray-500 cursor-pointer">
                                <span>Tests</span>
                            </CommandItem>
                            <CommandItem onSelect={() => setOpen(false)} className="text-gray-500 cursor-pointer ">
                                <span>Variables</span>
                            </CommandItem>
                            <CommandItem onSelect={() => setOpen(false)} className="text-gray-500 cursor-pointer ">
                                <span>Documentation</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>

                    {/* Bottom navigation hints */}
                    <div className="flex items-center justify-between px-3 py-2 border-t border-2 ">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                                <kbd className="px-1.5 py-0.5 border text-gray-400 rounded text-xs">↑</kbd>
                                <kbd className="px-1.5 py-0.5 border text-gray-400 rounded text-xs">↓</kbd>
                                <span>to navigate</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <kbd className="px-1.5 py-0.5 border text-gray-400 rounded text-xs">↵</kbd>
                                <span>to select</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <kbd className="px-1.5 py-0.5 border text-gray-400 rounded text-xs">ESC</kbd>
                            <span>to close</span>
                        </div>
                    </div>
                </div>
            </CommandDialog>
        </>
    )
}

export default SearchBar
