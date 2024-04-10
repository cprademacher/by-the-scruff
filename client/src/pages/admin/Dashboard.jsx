import MetaData from "../../components/MetaData";
import AdminLayout from "../AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <MetaData title={"Admin Dashboard"} />
      <h1>Dashboard</h1>
    </AdminLayout>
  );
}
