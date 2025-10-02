import * as React from "react"

// Simple className utility function to replace cn from @/lib/utils
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ResizablePanelGroup({
  className,
  children,
  direction = "horizontal",
  ...props
}) {
  return (
    <div
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full",
        direction === "vertical" ? "flex-col" : "",
        className
      )}
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: direction === "vertical" ? "column" : "row"
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function ResizablePanel({
  children,
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  ...props
}) {
  return (
    <div 
      data-slot="resizable-panel" 
      style={{
        flex: `${defaultSize} 1 0%`,
        minWidth: `${minSize}%`,
        maxWidth: `${maxSize}%`
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function ResizableHandle({
  withHandle = false,
  className,
  ...props
}) {
  return (
    <div
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-px items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-col-resize",
        className
      )}
      style={{
        width: "4px",
        cursor: "col-resize",
        backgroundColor: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
      {...props}
    >
      {withHandle && (
        <div 
          className="z-10 flex h-4 w-3 items-center justify-center rounded border bg-gray-200"
          style={{
            zIndex: 10,
            display: "flex",
            height: "16px",
            width: "12px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "2px",
            border: "1px solid #d1d5db",
            backgroundColor: "#e5e7eb"
          }}
        >
          <div style={{ width: "8px", height: "2px", backgroundColor: "#6b7280" }} />
        </div>
      )}
    </div>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }