"use client";

import * as React from "react";

export type LayoutMode = "vertical" | "horizontal";
export type FontSize = "sm" | "base" | "lg";
export type SidebarDensity = "compact" | "normal" | "spacious";
export type LayoutDirection = "ltr" | "rtl";

interface LayoutContextType {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  sidebarDensity: SidebarDensity;
  setSidebarDensity: (density: SidebarDensity) => void;
  layoutDirection: LayoutDirection;
  setLayoutDirection: (direction: LayoutDirection) => void;
  mounted: boolean;
}

const LayoutContext = React.createContext<LayoutContextType | undefined>(undefined);

export function useLayout() {
  const context = React.useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutMode, setLayoutModeState] = React.useState<LayoutMode>("vertical");
  const [fontSize, setFontSizeState] = React.useState<FontSize>("base");
  const [sidebarDensity, setSidebarDensityState] = React.useState<SidebarDensity>("normal");
  const [layoutDirection, setLayoutDirectionState] = React.useState<LayoutDirection>("ltr");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const savedLayout = localStorage.getItem("aether-layout-mode");
    if (savedLayout === "horizontal" || savedLayout === "vertical") {
      setLayoutModeState(savedLayout as LayoutMode);
    }
    
    const savedFontSize = localStorage.getItem("aether-font-size");
    if (savedFontSize === "sm" || savedFontSize === "base" || savedFontSize === "lg") {
      setFontSizeState(savedFontSize as FontSize);
    }

    const savedDensity = localStorage.getItem("aether-sidebar-density");
    if (savedDensity === "compact" || savedDensity === "normal" || savedDensity === "spacious") {
      setSidebarDensityState(savedDensity as SidebarDensity);
    }

    const savedDirection = localStorage.getItem("aether-layout-direction");
    if (savedDirection === "ltr" || savedDirection === "rtl") {
      setLayoutDirectionState(savedDirection as LayoutDirection);
    }

    setMounted(true);
  }, []);

  // Update root font size on document element client-side
  React.useEffect(() => {
    if (!mounted) return;
    const fontSizes = {
      sm: "14px",
      base: "16px",
      lg: "18px",
    };
    document.documentElement.style.fontSize = fontSizes[fontSize];
  }, [fontSize, mounted]);

  // Update document layout direction client-side
  React.useEffect(() => {
    if (!mounted) return;
    document.documentElement.dir = layoutDirection;
  }, [layoutDirection, mounted]);

  const setLayoutMode = React.useCallback((mode: LayoutMode) => {
    setLayoutModeState(mode);
    localStorage.setItem("aether-layout-mode", mode);
  }, []);

  const setFontSize = React.useCallback((size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem("aether-font-size", size);
  }, []);

  const setSidebarDensity = React.useCallback((density: SidebarDensity) => {
    setSidebarDensityState(density);
    localStorage.setItem("aether-sidebar-density", density);
  }, []);

  const setLayoutDirection = React.useCallback((direction: LayoutDirection) => {
    setLayoutDirectionState(direction);
    localStorage.setItem("aether-layout-direction", direction);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        layoutMode,
        setLayoutMode,
        fontSize,
        setFontSize,
        sidebarDensity,
        setSidebarDensity,
        layoutDirection,
        setLayoutDirection,
        mounted,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
