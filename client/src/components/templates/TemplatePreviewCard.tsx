import { useEffect } from "react";

interface TemplatePreviewCardProps {
  template: {
    name: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor?: string;
    headingFont: string;
    bodyFont: string;
    headingFontWeight?: string;
    bodyFontWeight?: string;
  };
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

/**
 * Minimal template preview card showing colors and typography
 * Displays key colors as swatches and "Aa" to demonstrate typography
 */
export function TemplatePreviewCard({ 
  template, 
  size = "md",
  onClick 
}: TemplatePreviewCardProps) {
  const bgColor = template.backgroundColor || "#ffffff";
  const headingWeight = template.headingFontWeight || "600";
  const bodyWeight = template.bodyFontWeight || "400";
  
  // Load Google Font for preview
  useEffect(() => {
    const fonts = [template.headingFont, template.bodyFont].filter(Boolean);
    const uniqueFonts = Array.from(new Set(fonts));
    
    uniqueFonts.forEach(font => {
      const fontFamily = font.replace(/\s+/g, '+');
      const linkId = `font-${fontFamily}`;
      
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@300;400;500;600;700&display=swap`;
        document.head.appendChild(link);
      }
    });
  }, [template.headingFont, template.bodyFont]);

  const sizeClasses = {
    sm: "h-32 w-full",
    md: "h-48 w-full",
    lg: "h-64 w-full"
  };

  const typographySizes = {
    sm: { heading: "text-3xl", body: "text-xs" },
    md: { heading: "text-5xl", body: "text-sm" },
    lg: { heading: "text-6xl", body: "text-base" }
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group relative`}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {/* Background pattern - subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${template.secondaryColor} 1px, transparent 1px), linear-gradient(90deg, ${template.secondaryColor} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Content */}
      <div className="relative h-full flex">
        {/* Left side - Typography showcase */}
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          {/* Large "Aa" typography demo */}
          <div 
            className={`${typographySizes[size].heading} leading-none`}
            style={{ 
              fontFamily: `"${template.headingFont}", sans-serif`,
              fontWeight: headingWeight,
              color: template.primaryColor
            }}
          >
            Aa
          </div>
          
          {/* Font name */}
          <div 
            className={`${typographySizes[size].body} mt-2 opacity-60`}
            style={{ 
              fontFamily: `"${template.bodyFont}", sans-serif`,
              fontWeight: bodyWeight,
              color: template.secondaryColor
            }}
          >
            {template.headingFont}
          </div>
        </div>
        
        {/* Right side - Color palette */}
        <div className="flex flex-col justify-center gap-2 pr-4">
          {/* Primary color */}
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg shadow-sm ring-1 ring-black/5"
              style={{ backgroundColor: template.primaryColor }}
            />
          </div>
          
          {/* Secondary color */}
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg shadow-sm ring-1 ring-black/5"
              style={{ backgroundColor: template.secondaryColor }}
            />
          </div>
          
          {/* Accent color */}
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg shadow-sm ring-1 ring-black/5"
              style={{ backgroundColor: template.accentColor }}
            />
          </div>
        </div>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
    </div>
  );
}

/**
 * Compact template preview for grid layouts
 * Shows colors and typography in a condensed format
 */
export function CompactTemplatePreview({ 
  template,
  onClick 
}: TemplatePreviewCardProps) {
  const bgColor = template.backgroundColor || "#ffffff";
  const headingWeight = template.headingFontWeight || "600";
  
  // Load Google Font for preview
  useEffect(() => {
    const fontFamily = template.headingFont.replace(/\s+/g, '+');
    const linkId = `font-${fontFamily}`;
    
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@300;400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }, [template.headingFont]);

  return (
    <div 
      className="h-28 w-full rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group relative"
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {/* Content */}
      <div className="relative h-full flex items-center justify-between p-4">
        {/* Typography showcase */}
        <div 
          className="text-4xl leading-none"
          style={{ 
            fontFamily: `"${template.headingFont}", sans-serif`,
            fontWeight: headingWeight,
            color: template.primaryColor
          }}
        >
          Aa
        </div>
        
        {/* Color dots */}
        <div className="flex gap-1.5">
          <div 
            className="w-5 h-5 rounded-full shadow-sm ring-1 ring-black/10"
            style={{ backgroundColor: template.primaryColor }}
          />
          <div 
            className="w-5 h-5 rounded-full shadow-sm ring-1 ring-black/10"
            style={{ backgroundColor: template.secondaryColor }}
          />
          <div 
            className="w-5 h-5 rounded-full shadow-sm ring-1 ring-black/10"
            style={{ backgroundColor: template.accentColor }}
          />
        </div>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
    </div>
  );
}
