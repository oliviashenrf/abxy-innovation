import React from "react";
import { RegularLayout } from "@/components/entrypoint-layouts/regular-layout";
import { faces } from "@/faces.config.json";
import HeroFace from "@/faces/hero/face.tsx";
import StatsFace from "@/faces/stats/face.tsx";
import ServicesFace from "@/faces/services/face.tsx";
import ProductsFace from "@/faces/products/face.tsx";
import ScalerFace from "@/faces/scaler/face.tsx";
import ContactFace from "@/faces/contact/face.tsx";


const visibleFaces = faces.filter((face) => !face.hidden);

export const componentMap = {
  "hero": HeroFace,
  "stats": StatsFace,
  "services": ServicesFace,
  "products": ProductsFace,
  "scaler": ScalerFace,
  "contact": ContactFace,
};

export const projectConfig = {"layout":"REGULAR","width":"FULL","theme":{"fontFamily":"Inter","headingFontFamily":"Inter","radius":"0.5rem","colors":{"default":{"background":"#FFFFFF","foreground":"#1E3A8A","card":"#FFFFFF","card-foreground":"#1E3A8A","card-border":"#BFDBFE","primary":"#2563EB","primary-foreground":"#FFFFFF","secondary":"#DBEAFE","secondary-foreground":"#1E40AF","muted":"#F0F9FF","muted-foreground":"#475569","accent":"#3B82F6","accent-foreground":"#FFFFFF","destructive":"#EF4444","destructive-foreground":"#FFFFFF","border":"#BFDBFE","input":"#BFDBFE","chart-1":"#1E3A8A","chart-2":"#2563EB","chart-3":"#3B82F6","chart-4":"#60A5FA","chart-5":"#93C5FD"},"dark":{"background":"#0F172A","foreground":"#F1F5F9","card":"#1E293B","card-foreground":"#F1F5F9","card-border":"#334155","primary":"#3B82F6","primary-foreground":"#FFFFFF","secondary":"#1E293B","secondary-foreground":"#F1F5F9","muted":"#334155","muted-foreground":"#94A3B8","accent":"#60A5FA","accent-foreground":"#FFFFFF","destructive":"#DC2626","destructive-foreground":"#FFFFFF","border":"#334155","input":"#334155","chart-1":"#1E3A8A","chart-2":"#2563EB","chart-3":"#3B82F6","chart-4":"#60A5FA","chart-5":"#93C5FD"}}},"tokens":{"palette":[{"name":"--white","value":"#ffffff"},{"name":"--color-1","value":"#1e3a8a"},{"name":"--color-2","value":"#2563eb"},{"name":"--color-3","value":"#3b82f6"},{"name":"--color-4","value":"#475569"},{"name":"--color-5","value":"#bfdbfe"},{"name":"--color-6","value":"#dbeafe"},{"name":"--color-7","value":"#f0f9ff"}],"fonts":[]}};

export default function Page() {
  return (
    <RegularLayout
      faces={visibleFaces}
      componentMap={componentMap}
      width="FULL"
      simulateFixedDimensions={false}
    />
  );
}