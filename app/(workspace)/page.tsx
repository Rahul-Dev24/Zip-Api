"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TabbedSidebar from "@/module/collections/components/side-bar";
import { useWorkspaceStore } from "@/module/layout/store";
import RequestPlayground from "@/module/request/components/request-playground";
import { useGetWorkspace } from "@/module/workspaces/hooks/workspace";
// import RequestPlayground from "@/modules/request/components/request-playground";

// import TabbedSidebar from "@/modules/workspace/components/sidebar";

import { Loader } from "lucide-react";
import * as React from "react"

const Page = () => {
  const { selectedWorkspace } = useWorkspaceStore();
  const { data: currentWorkspace, isLoading } = useGetWorkspace(selectedWorkspace?.id!);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader className="animate-spin h-6 w-6 text-indigo-500" />
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={65} minSize={40}>
        <RequestPlayground />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={35} maxSize={40} minSize={25} className="flex">
        <div className="flex-1">
          <TabbedSidebar currentWorkspace={currentWorkspace!} />

        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
};

export default Page;
