import { useState } from "react";
import { Link } from "wouter";
import { Plus, Eye, Edit, Trash2, Star, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { TemplateEditor } from "@/components/templates/TemplateEditor";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/**
 * Invoice Templates Management Page
 * 
 * This page allows users to:
 * - Browse template library (preset + custom templates)
 * - Initialize default templates (manual action)
 * - Create new custom templates
 * - Edit existing templates
 * - Delete custom templates
 * - Set default template
 * - Preview templates
 */
export default function InvoiceTemplates() {
  // UI State
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [deleteTemplateId, setDeleteTemplateId] = useState<number | null>(null);

  // Data & Mutations
  const { data: templates, isLoading, refetch } = trpc.templates.list.useQuery();
  const setDefaultMutation = trpc.templates.setDefault.useMutation();
  const deleteMutation = trpc.templates.delete.useMutation();
  const initializeMutation = trpc.templates.initializeTemplates.useMutation();

  const selectedTemplate = templates?.find(t => t.id === selectedTemplateId);

  // Categorize templates
  const presetNames = ["Modern", "Classic", "Minimal", "Bold", "Professional", "Creative"];
  const presetTemplates = templates?.filter(t => presetNames.includes(t.name)) || [];
  const customTemplates = templates?.filter(t => !presetNames.includes(t.name)) || [];
  const hasPresets = presetTemplates.length > 0;

  /**
   * Handle manual template initialization
   * User clicks "Initialize Default Templates" button
   */
  const handleInitializeTemplates = async () => {
    try {
      const result = await initializeMutation.mutateAsync();
      toast.success(`${result.count} templates initialized successfully`);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to initialize templates");
    }
  };

  /**
   * Handle setting a template as default
   */
  const handleSetDefault = async (templateId: number) => {
    try {
      await setDefaultMutation.mutateAsync({ id: templateId });
      toast.success("Default template updated");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to set default template");
    }
  };

  /**
   * Handle template deletion
   * Shows confirmation dialog first
   */
  const handleDelete = async () => {
    if (!deleteTemplateId) return;

    try {
      await deleteMutation.mutateAsync({ id: deleteTemplateId });
      toast.success("Template deleted");
      refetch();
      setDeleteTemplateId(null);
      
      // Clear selection if deleted template was selected
      if (selectedTemplateId === deleteTemplateId) {
        setSelectedTemplateId(null);
        setIsEditing(false);
        setIsPreviewing(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete template");
      setDeleteTemplateId(null);
    }
  };

  /**
   * Handle template editor completion
   */
  const handleEditComplete = () => {
    setIsEditing(false);
    setSelectedTemplateId(null);
    refetch();
  };

  // Show template editor when editing
  if (isEditing && selectedTemplateId) {
    return (
      <TemplateEditor
        templateId={selectedTemplateId}
        onComplete={handleEditComplete}
        onCancel={() => {
          setIsEditing(false);
          setSelectedTemplateId(null);
        }}
      />
    );
  }

  // Show template preview when previewing
  if (isPreviewing && selectedTemplate) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="container flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold">{selectedTemplate.name} - Preview</h1>
              <p className="text-sm text-muted-foreground">Preview how your invoices will look</p>
            </div>
            <Button onClick={() => setIsPreviewing(false)} variant="outline">
              Close Preview
            </Button>
          </div>
        </div>
        <div className="container py-8">
          <TemplatePreview template={selectedTemplate} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <img src="/SleekInvoices-Wide.svg" alt="SleekInvoices" className="h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Invoice Templates</h1>
              <p className="text-sm text-muted-foreground">
                Customize your invoice appearance with professional templates
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setSelectedTemplateId(null);
              setIsEditing(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        {isLoading ? (
          // Loading State
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-40 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !templates || templates.length === 0 ? (
          // Empty State - No templates at all
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-full max-w-md text-center space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-6">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">No Templates Yet</h2>
                <p className="text-muted-foreground">
                  Get started with professional invoice templates designed for your business
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleInitializeTemplates}
                  disabled={initializeMutation.isPending}
                  size="lg"
                  className="w-full"
                >
                  {initializeMutation.isPending ? (
                    <>Creating Templates...</>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Initialize Default Templates
                    </>
                  )}
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  This will create 6 professionally designed templates
                </p>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedTemplateId(null);
                    setIsEditing(true);
                  }}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Custom Template
                </Button>
              </div>
            </div>
          </div>
        ) : !hasPresets ? (
          // Has custom templates but no presets - show option to initialize
          <div className="space-y-8">
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Get Professional Templates
                </CardTitle>
                <CardDescription>
                  Add 6 professionally designed templates to your library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleInitializeTemplates}
                  disabled={initializeMutation.isPending}
                >
                  {initializeMutation.isPending ? (
                    <>Creating Templates...</>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Initialize Default Templates
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Show existing custom templates */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Custom Templates ({customTemplates.length})</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {customTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isPreset={false}
                    onEdit={() => {
                      setSelectedTemplateId(template.id);
                      setIsEditing(true);
                    }}
                    onPreview={() => {
                      setSelectedTemplateId(template.id);
                      setIsPreviewing(true);
                    }}
                    onDelete={() => setDeleteTemplateId(template.id)}
                    onSetDefault={() => handleSetDefault(template.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Has templates - show library
          <div className="space-y-8">
            {/* Preset Templates */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Preset Templates ({presetTemplates.length})</h3>
                <Badge variant="secondary">Professional Designs</Badge>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {presetTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isPreset={true}
                    onEdit={() => {
                      setSelectedTemplateId(template.id);
                      setIsEditing(true);
                    }}
                    onPreview={() => {
                      setSelectedTemplateId(template.id);
                      setIsPreviewing(true);
                    }}
                    onSetDefault={() => handleSetDefault(template.id)}
                  />
                ))}
              </div>
            </div>

            {/* Custom Templates */}
            {customTemplates.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Custom Templates ({customTemplates.length})</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {customTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isPreset={false}
                      onEdit={() => {
                        setSelectedTemplateId(template.id);
                        setIsEditing(true);
                      }}
                      onPreview={() => {
                        setSelectedTemplateId(template.id);
                        setIsPreviewing(true);
                      }}
                      onDelete={() => setDeleteTemplateId(template.id)}
                      onSetDefault={() => handleSetDefault(template.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTemplateId} onOpenChange={() => setDeleteTemplateId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This template will be permanently deleted.
              {templates?.find(t => t.id === deleteTemplateId)?.isDefault && (
                <span className="block mt-2 text-destructive font-medium">
                  Warning: This is your default template. Please set another template as default first.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/**
 * Template Card Component
 * Displays a single template with actions
 */
interface TemplateCardProps {
  template: any;
  isPreset: boolean;
  onEdit: () => void;
  onPreview: () => void;
  onDelete?: () => void;
  onSetDefault: () => void;
}

function TemplateCard({ template, isPreset, onEdit, onPreview, onDelete, onSetDefault }: TemplateCardProps) {
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
      {/* Color Preview Bar */}
      <div 
        className="h-24 w-full" 
        style={{
          background: `linear-gradient(135deg, ${template.primaryColor} 0%, ${template.secondaryColor} 100%)`
        }}
      />
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {template.name}
              {template.isDefault && (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              )}
            </CardTitle>
            <CardDescription className="capitalize">{template.templateType}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Template Info */}
        <div className="text-sm text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: template.primaryColor }} />
              <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: template.secondaryColor }} />
              <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: template.accentColor }} />
            </div>
            <span className="text-xs">{template.headingFont}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={onPreview} variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button onClick={onEdit} variant="outline" size="sm" className="flex-1">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        <div className="flex gap-2">
          {!template.isDefault && (
            <Button onClick={onSetDefault} variant="ghost" size="sm" className="flex-1">
              <Star className="h-4 w-4 mr-1" />
              Set Default
            </Button>
          )}
          {!isPreset && onDelete && (
            <Button 
              onClick={onDelete} 
              variant="ghost" 
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
