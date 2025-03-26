"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddLinkDialog } from "@/components/add-link-dialog"

export function AddLinkButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Link
      </Button>
      <AddLinkDialog open={open} onOpenChange={setOpen} />
    </>
  )
}

