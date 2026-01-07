import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/model';
import React, { useState } from 'react'
import { useCreateCollections } from '../hooks/collection';
import { toast } from 'sonner';


interface Props {
    workspaceId: string;
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
}


const CreateCollection = ({ workspaceId, isModalOpen, setIsModalOpen }: Props) => {

    const [name, setName] = useState("");
    const { mutateAsync, isPending } = useCreateCollections(workspaceId, name);

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.warning("Collection name is required.");
            setName("");
            return;
        };
        try {
            await mutateAsync(name);
            toast.success("Collection created successfully");
            setName("");
            setIsModalOpen(false);
        } catch (err) {
            toast.error("Failed to create Collection");
            console.error("Failed to create Collection:", err);
        }
    };

    return (
        <Modal
            title="Add New Collection"
            description="Create a new Collection to organize your requests"
            isOpen={isModalOpen}
            onClose={() => { setIsModalOpen(false); setName(""); }}
            onSubmit={handleSubmit}
            submitText={isPending ? "Creating..." : "Create Collection"}
            submitVariant="default"
        >
            <div className="space-y-4">
                <Input
                    className="w-full p-2 border rounded"
                    placeholder="Collection name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
        </Modal>
    )
}

export default CreateCollection
