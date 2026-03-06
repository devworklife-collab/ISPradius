import { useEffect, useState } from "react";
import api from "../api";

type Stats = {
  totalCustomers: number;
  activeSubscriptions: number;
  pendingInvoices: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get<Stats>("/dashboard/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>ISPradius Dashboard</h1>
      {stats ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>Total customers</h2>
            <p>{stats.totalCustomers}</p>
          </div>
          <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>Active subscriptions</h2>
            <p>{stats.activeSubscriptions}</p>
          </div>
          <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>Pending invoices</h2>
            <p>{stats.pendingInvoices}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
