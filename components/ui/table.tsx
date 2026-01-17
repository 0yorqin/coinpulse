"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a table element inside a horizontally scrollable container and merges provided class names with defaults.
 *
 * @param className - Additional CSS class names to append to the table's default classes
 * @param props - Additional props are spread onto the underlying `table` element
 * @returns The rendered table wrapped in a container that enables horizontal scrolling
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Renders a table header (<thead>) element with data-slot "table-header" and default row-bottom-border styling.
 *
 * @returns A `thead` element with `data-slot="table-header"`, the default `[&_tr]:border-b` styling merged into `className`, and any other props spread onto the element.
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled `tbody` element tagged with `data-slot="table-body"` for composition.
 *
 * The element includes default body styling (removes the bottom border on the last row), merges any provided `className`, and forwards all other props to the underlying `tbody`.
 *
 * @returns The rendered `tbody` element with merged classes and forwarded props
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled table footer element for use as a table's <tfoot>.
 *
 * @returns A `<tfoot>` element with default footer styles (muted background, top border, medium font) that merges `className` with its defaults and spreads any other provided props.
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table row (<tr>) with standardized styles and a data-slot="table-row" attribute for composition.
 *
 * @param className - Additional CSS classes merged with the component's default styles.
 * @param props - Additional props forwarded to the underlying `<tr>` element.
 * @returns The rendered table row element with merged classes and forwarded props.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table header cell with default header styling and a data-slot for composition.
 *
 * @param className - Additional CSS class names to merge with the component's default styles
 * @returns A `<th>` element with default table header classes, the `data-slot="table-head"` attribute, and any other props applied
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table cell (`td`) with standardized padding, vertical alignment, and checkbox-aware spacing.
 *
 * The element is tagged with `data-slot="table-cell"`, merges the provided `className` with default styles, and spreads any other props onto the underlying `td`.
 *
 * @returns A `td` element with default styling and any provided props applied.
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table caption element with default muted styling and a `data-slot="table-caption"` attribute.
 *
 * @param className - Additional CSS classes to merge with the component's default styles
 * @returns The rendered caption element
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}