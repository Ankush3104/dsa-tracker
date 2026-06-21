'use client';
import { useStore } from '@/lib/store';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

export default function Analytics() {
  const { problems, topics } = useStore();

  const difficultyData = [
    { name: 'Easy', value: problems.filter(p => p.difficulty === 'Easy').length, color: '#10b981' },
    { name: 'Medium', value: problems.filter(p => p.difficulty === 'Medium').length, color: '#f97316' },
    { name: 'Hard', value: problems.filter(p => p.difficulty === 'Hard').length, color: '#ef4444' },
  ];

  const topicData = topics.map(t => ({ name: t.name, completion: (t.solvedProblems / t.totalProblems) * 100 }));

  // Mock weekly data
  const weeklyData = [
    { name: 'W1', problems: 5 },
    { name: 'W2', problems: 8 },
    { name: 'W3', problems: 12 },
    { name: 'W4', problems: 7 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-4">Difficulty Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={difficultyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {difficultyData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-4">Topic Completion (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicData}>
              <XAxis dataKey="name" stroke="#8884d8" angle={-45} textAnchor="end" height={70} interval={0} />
              <YAxis domain={[0, 100]} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} />
              <Bar dataKey="completion" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="problems" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
