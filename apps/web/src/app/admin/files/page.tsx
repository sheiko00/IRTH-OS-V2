'use client';
import { useState } from 'react';
import { FolderOpen, Image, FileText, Film, Upload, Plus, Trash2, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FilesPage() {
  const [tab, setTab] = useState<'all'|'images'|'documents'|'videos'>('all');
  const folders = [
    { id:'1', name:'Product Photos', count:24 },
    { id:'2', name:'Marketing Assets', count:12 },
    { id:'3', name:'Supplier Documents', count:8 },
  ];
  const files = [
    { id:'1', name:'radiance-serum-hero.jpg', type:'IMAGE', size:'2.4 MB', url:'', folder:'Product Photos', uploadedAt:'May 5, 2026' },
    { id:'2', name:'hydra-cream-label.png', type:'IMAGE', size:'1.1 MB', url:'', folder:'Product Photos', uploadedAt:'May 4, 2026' },
    { id:'3', name:'supplier-invoice-042.pdf', type:'DOCUMENT', size:'340 KB', url:'', folder:'Supplier Documents', uploadedAt:'May 3, 2026' },
    { id:'4', name:'campaign-video-summer.mp4', type:'VIDEO', size:'45 MB', url:'', folder:'Marketing Assets', uploadedAt:'May 1, 2026' },
    { id:'5', name:'coa-batch-2026-04.pdf', type:'DOCUMENT', size:'120 KB', url:'', folder:'Supplier Documents', uploadedAt:'Apr 28, 2026' },
  ];
  const iconMap = { IMAGE: Image, DOCUMENT: FileText, VIDEO: Film };
  const colorMap = { IMAGE: 'text-blue-500 bg-blue-500/10', DOCUMENT: 'text-amber-500 bg-amber-500/10', VIDEO: 'text-purple-500 bg-purple-500/10' };
  const filtered = tab === 'all' ? files : files.filter(f => f.type === tab.toUpperCase().slice(0,-1));

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Files</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-border hover:bg-accent"><Plus className="w-4 h-4"/>New Folder</button>
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25"><Upload className="w-4 h-4"/>Upload</button>
        </div>
      </div>
      {/* Folders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {folders.map(f=>(
          <button key={f.id} className="p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all text-left">
            <Folder className="w-8 h-8 text-amber-500 mb-2"/>
            <p className="text-sm font-medium truncate">{f.name}</p>
            <p className="text-xs text-muted-foreground">{f.count} files</p>
          </button>
        ))}
      </div>
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-xl w-fit">
        {(['all','images','documents','videos'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize',tab===t?'bg-background shadow-sm':'text-muted-foreground hover:text-foreground')}>{t}</button>
        ))}
      </div>
      {/* File List */}
      <div className="space-y-2">
        {filtered.map(f=>{
          const Icon = iconMap[f.type as keyof typeof iconMap] || FileText;
          const color = colorMap[f.type as keyof typeof colorMap] || 'text-gray-500 bg-gray-500/10';
          return (
            <div key={f.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/20 transition-colors">
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', color)}><Icon className="w-5 h-5"/></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.folder} • {f.size}</p>
              </div>
              <p className="text-xs text-muted-foreground hidden md:block">{f.uploadedAt}</p>
              <button className="p-2 rounded-lg hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive/70"/></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
