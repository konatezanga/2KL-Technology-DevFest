"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "./utils";

// Composant Tabs principal
const Tabs = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("flex flex-col", className)}
    {...props}
  />
));
Tabs.displayName = "Tabs";

// Liste des onglets
const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex border-b border-gray-200 dark:border-gray-700",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

// Bouton/Trigger pour chaque onglet
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 data-[state=active]:bg-white data-[state=active]:text-black dark:text-gray-200 dark:hover:bg-gray-800 dark:data-[state=active]:bg-gray-900",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

// Contenu de chaque onglet
const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
