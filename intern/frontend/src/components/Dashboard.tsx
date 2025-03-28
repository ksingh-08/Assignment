
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  function Dashboard() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Completed my assignment! Pleaseeee hiree me.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  export default Dashboard;
  