
import * as React from "react"
import { cn } from "@/lib/utils"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoHeight?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoHeight = false, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

    React.useEffect(() => {
      if (autoHeight && textareaRef.current) {
        const adjustHeight = () => {
          const textarea = textareaRef.current
          if (textarea) {
            textarea.style.height = "auto"
            textarea.style.height = `${textarea.scrollHeight}px`
          }
        }

        adjustHeight()
        textareaRef.current.addEventListener("input", adjustHeight)

        return () => {
          if (textareaRef.current) {
            textareaRef.current.removeEventListener("input", adjustHeight)
          }
        }
      }
    }, [autoHeight])

    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-gray-200 focus-visible:dark:border-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          autoHeight && "overflow-hidden",
          className,
        )}
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          textareaRef.current = node
        }}
        {...props}
      />
    )
  },
)

Textarea.displayName = "Textarea"

export { Textarea }

