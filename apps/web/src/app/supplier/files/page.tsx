'use client';

import { useState } from 'react';
import { FileText, Upload, Trash2, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SupplierFilesPage() {
  const [tab, setTab] = useState<'all' | 'coa' | 'invoices'>('all');

  const files = [
    { id: '1', name: 'COA_B-2026-003.pdf', type: 'COA', size: '1.2 MB', status: 'VERIFIED', relatedTo: 'Batch B-2026-003', uploadedAt: 'May 3, 2026' },
    { id: '2', name: 'Invoice_INV-089.pdf', type: 'INVOICE', size: '450 KB', status: 'PENDING_REVIEW', relatedTo: 'April Payout', uploadedAt: 'May 1, 2026' },
    { id: '3', name: 'COA_B-2026-002.pdf', type: 'COA', size: '1.1 MB', status: 'VERIFIED', relatedTo: 'Batch B-2026-002', uploadedAt: 'Apr 16, 2026' },
    { id: '4', name: 'Invoice_INV-088.pdf', type: 'INVOICE', size: '420 KB', status: 'VERIFIED', relatedTo: 'March Payout', uploadedAt: 'Apr 2, 2026' },
    { id: '5', name: 'COA_B-2026-001.pdf', type: 'COA', size: '1.4 MB', status: 'VERIFIED', relatedTo: 'Batch B-2026-001', uploadedAt: 'Feb 6, 2026' },
  ];

  const filtered = tab === 'all' ? files : files.filter(f => f.type === tab.toUpperCase());

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documents & Files</h1>
          <p className="text-muted-foreground">Manage Certificates of Analysis and Invoices</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="flex gap-1 p-1 bg-muted/50 rounded-xl w-fit">
        {(['all', 'coa', 'invoices'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize',
              tab === t ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t === 'coa' ? 'COAs' : t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((file) => (
          <div key={file.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{file.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="font-medium bg-muted px-1.5 py-0.5 rounded">{file.type}</span>
                  <span>•</span>
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{file.relatedTo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full border-t border-border sm:border-0 pt-3 sm:pt-0">
              <div className="flex items-center gap-1.5">
                {file.status === 'VERIFIED' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-500">Verified</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-medium text-amber-500">Pending Review</span>
                  </>
                )}
              </div>
              
              <div className="text-xs text-muted-foreground hidden lg:block">
                {file.uploadedAt}
              </div>

              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="Download">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4 text-destructive/70" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-card rounded-2xl border border-border">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No files found</p>
          </div>
        )}
      </div>
    </div>
  );
}
