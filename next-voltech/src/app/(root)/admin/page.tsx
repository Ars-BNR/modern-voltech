import AdminPanel from "@/components/shared/adminPanel/AdminPanel";
import ProtectedRoute from "@/components/shared/protectedRoute/ProtectedRoute";

export default async function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  );
}
