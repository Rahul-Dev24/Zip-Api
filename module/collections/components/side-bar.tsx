import React, { useState } from 'react';
import { useCollections } from '../hooks/collection';
import { Archive, Clock, Code, ExternalLink, HelpCircle, Loader, Plus, Search, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateCollection from './create-collections';
import EmptyCollections from './empty-collection';
import CollectionFolder from './collection-folder';

interface Props {
    currentWorkspace: {
        id: string,
        name: string
    }
}

const TabbedSidebar = ({ currentWorkspace }: Props) => {

    const [activeTab, setActiveTab] = useState("Collections");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: collections, isLoading } = useCollections(currentWorkspace?.id);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <Loader className="animate-spin h-6 w-6 text-indigo-500" />
            </div>
        );
    }

    const sidebarItems = [
        { icon: Archive, label: 'Collections' },
        { icon: Clock, label: 'History' },
        { icon: Share2, label: 'Share' },
        { icon: Code, label: 'Code' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "Collections":
                return (
                    <div className='h-full dark:text-zinc-100 flex flex-col dark:bg-zinc-950 bg-gray-100' >

                        <div className='flex items-center justify-between p-4 border-b dark:border-zinc-800 border-gray-400' >
                            <div className="flex items-center space-x-2">
                                <span className="text-sm dark:text-zinc-400">{currentWorkspace?.name}</span>
                                <span className="dark:text-zinc-600">›</span>
                                <span className="text-sm font-medium">Collections</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <HelpCircle className="w-4 h-4 dark:text-zinc-400 hover:dark:text-zinc-300 cursor-pointer" />
                                <ExternalLink className="w-4 h-4 dark:text-zinc-400  hover:dark:text-zinc-300 cursor-pointer" />
                            </div>
                        </div>

                        <div className="p-4 border-b dark:border-zinc-800 border-gray-400">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full dark:bg-zinc-900 bg-gray-200 border dark:border-zinc-700 border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="p-4 border-b dark:border-zinc-800 border-gray-400">
                            <Button className='hover:bg-indigo-200 cursor-pointer' variant="ghost" onClick={() => setIsModalOpen(true)}>
                                <Plus className="w-4 h-4" />
                                <span className="text-sm font-medium">New</span>
                            </Button>
                        </div>

                        {
                            collections && collections.length > 0 ? (
                                collections.map((collection) => (
                                    <div className='flex flex-col justify-start items-start p-3 border-b dark:border-zinc-800 border-gray-400 w-full' key={collection.id}>
                                        <CollectionFolder collection={collection} />
                                    </div>
                                ))
                            ) : (
                                <EmptyCollections />
                            )}

                    </div>
                );
            default:
                return <div className="p-4 text-zinc-400">Select a tab to view content</div>;
        }
    }

    return (
        <div className="flex h-screen bg-zinc-900">
            {/* Sidebar */}
            <div className="w-12 dark:bg-zinc-900 bg-gray-200 border-r dark:border-zinc-800 border-gray-400 flex flex-col items-center py-4 space-y-4">
                {sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveTab(item.label)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${activeTab === item.label
                            ? 'bg-indigo-600 text-white'
                            : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
                            }`}
                    >
                        <item.icon className="w-4 h-4" />
                    </div>
                ))}
            </div>

            <div className="flex-1 bg-zinc-900 overflow-y-auto">{renderTabContent()}</div>


            <CreateCollection
                workspaceId={currentWorkspace?.id}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

        </div>
    )
}

export default TabbedSidebar
