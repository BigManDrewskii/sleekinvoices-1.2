import * as React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  GoogleFont,
  POPULAR_FONTS,
  FONT_WEIGHTS,
  loadGoogleFont,
  getAvailableWeights,
  searchFonts,
  filterFontsByCategory,
  FontWeight,
} from '@/lib/google-fonts';

interface GoogleFontPickerProps {
  value: string;
  weight?: number;
  onFontChange: (font: string) => void;
  onWeightChange?: (weight: number) => void;
  showWeightPicker?: boolean;
  placeholder?: string;
  className?: string;
  previewType?: 'heading' | 'body';
}

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'sans-serif', label: 'Sans' },
  { value: 'serif', label: 'Serif' },
  { value: 'display', label: 'Display' },
  { value: 'monospace', label: 'Mono' },
] as const;

/**
 * Elegant Typography Preview Component
 * Showcases font in a refined, manus.im-inspired layout
 */
function ElegantTypographyPreview({
  font,
  weight,
  type,
  isHovering
}: {
  font: string;
  weight: number;
  type: 'heading' | 'body';
  isHovering?: boolean;
}) {
  const fontStyle = { fontFamily: `"${font}", sans-serif`, fontWeight: weight };

  if (type === 'heading') {
    return (
      <div className="space-y-8">
        {/* Large Aa Display */}
        <div className="flex flex-col items-center py-6">
          <span
            className={cn(
              "text-7xl font-semibold text-foreground leading-none transition-all duration-300",
              isHovering && "scale-105"
            )}
            style={fontStyle}
          >
            Aa
          </span>
          <div className="mt-4 text-xs text-muted-foreground font-mono tabular-nums">
            {weight}
          </div>
        </div>

        {/* Refined Alphabet Preview */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div
              className="text-base tracking-[0.02em] text-foreground/90 text-center"
              style={fontStyle}
            >
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </div>
            <div
              className="text-base tracking-[0.01em] text-muted-foreground/80 text-center"
              style={fontStyle}
            >
              abcdefghijklmnopqrstuvwxyz
            </div>
            <div
              className="text-sm tabular-nums text-muted-foreground/70 text-center"
              style={fontStyle}
            >
              0123456789
            </div>
          </div>
        </div>

        {/* Elegant Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
        </div>

        {/* Sample Text */}
        <div className="space-y-2">
          <p
            className="text-sm text-foreground/70 text-center leading-relaxed"
            style={fontStyle}
          >
            The quick brown fox jumps
          </p>
          <p
            className="text-sm text-foreground/70 text-center leading-relaxed"
            style={fontStyle}
          >
            over the lazy dog
          </p>
        </div>
      </div>
    );
  }

  // Body font preview
  return (
    <div className="space-y-8">
      {/* Large Aa Display */}
      <div className="flex flex-col items-center py-6">
        <span
          className={cn(
            "text-7xl font-normal text-foreground leading-none transition-all duration-300",
            isHovering && "scale-105"
          )}
          style={fontStyle}
        >
          Aa
        </span>
        <div className="mt-4 text-xs text-muted-foreground font-mono tabular-nums">
          {weight}
        </div>
      </div>

      {/* Sample Paragraphs */}
      <div className="space-y-4">
        <p
          className="text-sm text-foreground/80 leading-relaxed"
          style={fontStyle}
        >
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
        </p>
        <p
          className="text-xs text-muted-foreground/70 leading-relaxed"
          style={fontStyle}
        >
          Professional typography establishes hierarchy, creates rhythm, and guides the reader through content with purpose and clarity.
        </p>
      </div>

      {/* Elegant Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
      </div>

      {/* Invoice Style Numbers */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm" style={fontStyle}>
          <span className="text-muted-foreground/70">Subtotal</span>
          <span className="tabular-nums text-foreground/80">$1,234.56</span>
        </div>
        <div className="flex items-center justify-between text-sm" style={fontStyle}>
          <span className="text-muted-foreground/70">Tax (8%)</span>
          <span className="tabular-nums text-foreground/80">$98.76</span>
        </div>
        <div className="flex items-center justify-between text-base font-medium pt-2 border-t border-border/50" style={fontStyle}>
          <span className="text-foreground/90">Total</span>
          <span className="tabular-nums text-foreground">$1,333.32</span>
        </div>
      </div>
    </div>
  );
}

export function GoogleFontPicker({
  value,
  weight = 400,
  onFontChange,
  onWeightChange,
  showWeightPicker = true,
  placeholder = 'Select font...',
  className,
  previewType = 'heading',
}: GoogleFontPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [weightOpen, setWeightOpen] = useState(false);
  const [hoveredFont, setHoveredFont] = useState<string | null>(null);

  // Find the currently selected font
  const selectedFont = useMemo(() => {
    return POPULAR_FONTS.find(f => f.family === value);
  }, [value]);

  // Get available weights for selected font
  const availableWeights = useMemo(() => {
    if (!selectedFont) return FONT_WEIGHTS.filter(w => w.value === 400 || w.value === 700);
    return getAvailableWeights(selectedFont);
  }, [selectedFont]);

  // Filter fonts based on search and category
  const filteredFonts = useMemo(() => {
    let fonts = POPULAR_FONTS;

    if (category !== 'all') {
      fonts = filterFontsByCategory(category as GoogleFont['category'], fonts);
    }

    if (search) {
      fonts = searchFonts(search, fonts);
    }

    return fonts;
  }, [search, category]);

  // Load the selected font
  useEffect(() => {
    if (value) {
      loadGoogleFont(value, ['300', '400', '500', '600', '700']);
    }
  }, [value]);

  // Load fonts as they appear in the list (for preview)
  const loadFontForPreview = useCallback((family: string) => {
    loadGoogleFont(family, ['400', '600', '700']);
    setHoveredFont(family);
  }, []);

  const handleSelectFont = (font: GoogleFont) => {
    onFontChange(font.family);
    loadGoogleFont(font.family, ['300', '400', '500', '600', '700']);
    setOpen(false);
    setSearch('');
    setHoveredFont(null);
  };

  const handleSelectWeight = (w: FontWeight) => {
    onWeightChange?.(w.value);
    setWeightOpen(false);
  };

  const currentWeight = availableWeights.find(w => w.value === weight) || availableWeights.find(w => w.value === 400);

  // Determine which font to show in preview
  const previewFont = hoveredFont || value || 'Inter';

  return (
    <div className={cn('flex gap-2', className)}>
      {/* Font Family Picker */}
      <Popover open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setHoveredFont(null);
          setSearch('');
          setCategory('all');
        }
      }}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex-1 justify-between font-normal h-9"
            style={{ fontFamily: value || 'inherit' }}
          >
            <span className="truncate text-sm">
              {value || placeholder}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[600px] p-0 shadow-xl"
          align="start"
          sideOffset={8}
        >
          <div className="flex h-[480px]">
            {/* Left side - Font list */}
            <div className="w-[300px] border-r border-border/50 flex flex-col bg-muted/5">
              {/* Search Header */}
              <div className="p-4 border-b border-border/50 bg-background/50 backdrop-blur-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                  <Input
                    placeholder="Search fonts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9 bg-background/50 border-border/50 focus-visible:ring-1"
                    autoFocus
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="px-3 py-2.5 border-b border-border/50 bg-background/30">
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={cn(
                        'px-3 py-1.5 text-xs rounded-md font-medium transition-all duration-200',
                        category === cat.value
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font List */}
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredFonts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mb-3">
                        <Search className="h-5 w-5 text-muted-foreground/50" />
                      </div>
                      <p className="text-sm text-muted-foreground">No fonts found</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">Try a different search term</p>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      {filteredFonts.map((font) => (
                        <button
                          key={font.family}
                          onClick={() => handleSelectFont(font)}
                          onMouseEnter={() => loadFontForPreview(font.family)}
                          onMouseLeave={() => setHoveredFont(null)}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group',
                            value === font.family
                              ? 'bg-primary/10 text-primary shadow-sm'
                              : hoveredFont === font.family
                              ? 'bg-muted/60 text-foreground shadow-sm scale-[0.99]'
                              : 'text-foreground/70 hover:bg-muted/40 hover:text-foreground'
                          )}
                        >
                          <span
                            className="text-sm truncate transition-all"
                            style={{ fontFamily: `"${font.family}", ${font.category}` }}
                          >
                            {font.family}
                          </span>
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            {value === font.family && (
                              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Font Count Footer */}
              <div className="px-4 py-2.5 border-t border-border/50 bg-muted/10">
                <p className="text-xs text-muted-foreground/70 text-center font-medium">
                  {filteredFonts.length} {filteredFonts.length === 1 ? 'font' : 'fonts'}
                  {search && ' matching'}
                </p>
              </div>
            </div>

            {/* Right side - Typography Preview */}
            <div className="w-[300px] bg-gradient-to-br from-background via-muted/5 to-muted/10 p-6 overflow-y-auto">
              {/* Preview Header */}
              <div className="flex flex-col gap-2 mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Preview
                  </span>
                  {hoveredFont && (
                    <span className="text-xs text-primary font-medium animate-in fade-in slide-in-from-right-2 duration-200">
                      Hover
                    </span>
                  )}
                </div>
                {(hoveredFont || value) && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-foreground truncate">
                      {hoveredFont || value}
                    </span>
                  </div>
                )}
              </div>

              {/* Preview Content */}
              <ElegantTypographyPreview
                font={previewFont}
                weight={weight}
                type={previewType}
                isHovering={!!hoveredFont}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Weight Picker */}
      {showWeightPicker && (
        <Popover open={weightOpen} onOpenChange={setWeightOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={weightOpen}
              className="w-[120px] justify-between h-9"
            >
              <span className="truncate text-sm">{currentWeight?.label || 'Regular'}</span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[180px] p-2 shadow-lg"
            align="start"
            sideOffset={8}
          >
            <div className="space-y-0.5">
              {availableWeights.map((w) => (
                <button
                  key={w.value}
                  onClick={() => handleSelectWeight(w)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200',
                    weight === w.value
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-foreground hover:bg-muted'
                  )}
                  style={{ fontWeight: w.value }}
                >
                  <span className="text-sm">{w.label}</span>
                  <span className="text-xs text-muted-foreground/70 tabular-nums font-mono">
                    {w.value}
                  </span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

// Simplified font picker for single selection without weight
export function SimpleFontPicker({
  value,
  onChange,
  placeholder = 'Select font...',
  className,
}: {
  value: string;
  onChange: (font: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <GoogleFontPicker
      value={value}
      onFontChange={onChange}
      showWeightPicker={false}
      placeholder={placeholder}
      className={className}
    />
  );
}
