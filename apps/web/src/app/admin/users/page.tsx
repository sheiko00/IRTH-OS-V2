'use client';
import { Users, Shield, Plus, Search, MoreVertical } from 'lucide-react';
import { cn, getStatusColor } from '@/lib/utils';

export default function UsersPage() {
  const users = [
    { id:'1', name:'IRTH Admin', email:'admin@irth.app', role:'SUPER_ADMIN', isActive:true, createdAt:'Jan 10, 2026' },
    { id:'2', name:'Sara Operations', email:'sara@irth.app', role:'OPERATIONS', isActive:true, createdAt:'Feb 15, 2026' },
    { id:'3', name:'Ahmed Marketing', email:'ahmed@irth.app', role:'MARKETING', isActive:true, createdAt:'Mar 01, 2026' },
    { id:'4', name:'Nour Staff', email:'nour@irth.app', role:'STAFF', isActive:false, createdAt:'Apr 10, 2026' },
  ];
  const roleColors: Record<string,string> = {
    SUPER_ADMIN:'bg-red-500/10 text-red-500 border-red-500/20',
    ADMIN:'bg-purple-500/10 text-purple-500 border-purple-500/20',
    OPERATIONS:'bg-blue-500/10 text-blue-500 border-blue-500/20',
    MARKETING:'bg-pink-500/10 text-pink-500 border-pink-500/20',
    STAFF:'bg-gray-500/10 text-gray-500 border-gray-500/20',
  };
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Users & Roles</h1><p className="text-muted-foreground">{users.length} team members</p></div>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25"><Plus className="w-4 h-4"/>Add User</button>
      </div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border bg-muted/30">
            <th className="text-left text-xs font-semibold text-muted-foreground p-4">User</th>
            <th className="text-left text-xs font-semibold text-muted-foreground p-4">Role</th>
            <th className="text-left text-xs font-semibold text-muted-foreground p-4">Status</th>
            <th className="text-left text-xs font-semibold text-muted-foreground p-4">Joined</th>
          </tr></thead>
          <tbody>{users.map(u=>(
            <tr key={u.id} className="border-b border-border/50 hover:bg-muted/20">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{u.name.charAt(0)}</div>
                  <div><p className="text-sm font-medium">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
                </div>
              </td>
              <td className="p-4"><span className={cn('px-2.5 py-1 rounded-full text-[11px] font-semibold border',roleColors[u.role]||'')}>{u.role}</span></td>
              <td className="p-4"><div className={cn('w-2 h-2 rounded-full inline-block mr-2',u.isActive?'bg-green-500':'bg-gray-400')}/><span className="text-sm">{u.isActive?'Active':'Inactive'}</span></td>
              <td className="p-4 text-sm text-muted-foreground">{u.createdAt}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
