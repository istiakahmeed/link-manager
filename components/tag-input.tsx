"use client"

import type React from "react"

import { useState, useRef, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagInputProps {
  id: string
  placeholder?: string
  tags: string[]
  setTags: (tags: string[]) => void
}

export function TagInput({ id, placeholder, tags, setTags }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault()

      if (!tags.includes(inputValue.trim()) && inputValue.trim() !== "") {
        setTags([...tags, inputValue.trim()])
        setInputValue("")
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      e.preventDefault()
      const newTags = [...tags]
      newTags.pop()
      setTags(newTags)
    }
  }

  const removeTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      className="flex flex-wrap items-center gap-1 rounded-md border border-input bg-background p-1 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      onClick={handleContainerClick}
    >
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="gap-1 px-2 py-0">
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              removeTag(index)
            }}
            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {tag}</span>
          </button>
        </Badge>
      ))}
      <Input
        ref={inputRef}
        id={id}
        type="text"
        placeholder={tags.length === 0 ? placeholder : ""}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-1 border-0 p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}

