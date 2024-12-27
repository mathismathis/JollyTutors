export default function DashboardPage() {
    const data = {
      stats: [
        { label: "Total Users", value: 1200 },
        { label: "Active Users", value: 450 },
        { label: "New Signups", value: 50 },
      ],
    };
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {data.stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded">
              <h2 className="text-lg font-semibold">{stat.label}</h2>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  