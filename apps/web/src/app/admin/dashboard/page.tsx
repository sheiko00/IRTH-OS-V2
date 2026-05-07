import { redirect } from 'next/navigation';

// Founder's full-screen command center lives at /founder (outside admin layout)
export default function AdminDashboardRedirect() {
  redirect('/founder');
}
