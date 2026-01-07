"use client";

import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/model";
import { useCreateWorkspace } from "@/module/workspaces/hooks/workspace";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateWorkspace = ({
    isModalOpen,
    setIsModalOpen,
}: {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
}) => {
    const [name, setName] = useState("");
    const { mutateAsync, isPending } = useCreateWorkspace();

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.warning("Workspace name is required.");
            setName("");
            return;
        }
        try {
            await mutateAsync(name);
            toast.success("Workspace created successfully");
            setName("");
            setIsModalOpen(false);
        } catch (err) {
            setName("");
            toast.error("Failed to create workspace");
        }
    };

    return (
        <Modal
            title="Add New Workspace"
            description="Create a new workspace to organize your projects"
            isOpen={isModalOpen}
            onClose={() => { setIsModalOpen(false); setName(""); }}
            onSubmit={handleSubmit}
            submitText={isPending ? "Creating..." : "Create Workspace"}
            submitVariant="default"
        >
            <div className="space-y-4">
                <Input
                    className="w-full p-2 border rounded"
                    placeholder="Workspace name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default CreateWorkspace;
