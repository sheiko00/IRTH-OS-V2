'use client';
import { Settings, Globe, Truck, CreditCard, Bell, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function SettingsPage() {
  const [tab, setTab] = useState('general');
  const tabs = [
    { id:'general', label:'General', icon: Globe },
    { id:'shipping', label:'Shipping', icon: Truck },
    { id:'payment', label:'Payment', icon: CreditCard },
    { id:'notifications', label:'Notifications', icon: Bell },
  ];
  return (
    <div className="space-y-6 animate-fade-up">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className={cn('w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left',tab===t.id?'bg-primary/10 text-primary':'text-muted-foreground hover:bg-accent')}>
              <t.icon className="w-4 h-4"/>{t.label}
            </button>
          ))}
        </div>
        <div className="lg:col-span-3 p-6 rounded-2xl border border-border bg-card">
          {tab==='general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">General Settings</h2>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium mb-2">Store Name</label><input defaultValue="IRTH" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
                <div><label className="block text-sm font-medium mb-2">Currency</label><select defaultValue="EGP" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"><option>EGP</option><option>USD</option><option>SAR</option><option>AED</option></select></div>
                <div><label className="block text-sm font-medium mb-2">Default Language</label><select defaultValue="en" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"><option value="en">English</option><option value="ar">العربية</option></select></div>
              </div>
            </div>
          )}
          {tab==='shipping' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Shipping Settings</h2>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium mb-2">Default Shipping Cost (EGP)</label><input type="number" defaultValue="60" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
                <div><label className="block text-sm font-medium mb-2">Free Shipping Threshold (EGP)</label><input type="number" defaultValue="500" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/></div>
                <div><label className="block text-sm font-medium mb-2">Carrier</label><select defaultValue="bosta" className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"><option value="bosta">Bosta</option><option value="aramex">Aramex</option><option value="manual">Manual</option></select></div>
              </div>
            </div>
          )}
          {tab==='payment' && <div className="space-y-6"><h2 className="text-lg font-semibold">Payment Settings</h2><p className="text-muted-foreground text-sm">Configure payment gateway (COD, Card via Paymob/Fawry)</p></div>}
          {tab==='notifications' && <div className="space-y-6"><h2 className="text-lg font-semibold">Notification Settings</h2><p className="text-muted-foreground text-sm">Configure email, SMS, and push notification preferences</p></div>}
          <div className="pt-6 mt-6 border-t border-border">
            <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25"><Save className="w-4 h-4"/>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
