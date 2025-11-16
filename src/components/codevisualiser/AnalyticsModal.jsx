export const AnalyticsModal = ()  => {
  const stats = [
    { label: 'Total Views', value: '24.5K', change: '+12%' },
    { label: 'Engagement', value: '68%', change: '+5%' },
    { label: 'Conversions', value: '3.2K', change: '+23%' },
    { label: 'Avg. Session', value: '4m 32s', change: '+18%' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-slate-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-green-600 font-semibold mt-2">{stat.change} from last week</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Traffic Over Time</h3>
        <div className="h-40 bg-gradient-to-b from-blue-50 to-slate-50 rounded-lg border border-blue-100 flex items-end justify-around p-4">
          {[65, 45, 78, 52, 85, 71, 62].map((height, index) => (
            <div
              key={index}
              style={{ height: `${height}%` }}
              className="w-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm hover:from-blue-700 hover:to-blue-500 transition-all"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Top Pages</h3>
        <div className="space-y-2">
          {[
            { page: '/dashboard', views: '4,230' },
            { page: '/analytics', views: '2,145' },
            { page: '/settings', views: '1,876' }
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium text-gray-900">{item.page}</span>
              <span className="text-sm text-gray-600">{item.views} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}