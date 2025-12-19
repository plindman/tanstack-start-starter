import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button>New Project</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Content */}
        <div className="p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">No recent activity to show.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
          <h3 className="font-semibold mb-2">Your Projects</h3>
          <p className="text-sm text-muted-foreground">You haven't created any projects yet.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
          <h3 className="font-semibold mb-2">System Status</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
