import { useNavigate } from "react-router-dom";
import {
  UserCircle,
  TrendingUp,
  Users,
  Brain,
  AlertCircle,
  Trophy,
  BookOpen,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TutorDashboard = () => {
  const navigate = useNavigate();

  const classPerformanceData = [
    { date: "Mon", accuracy: 75, avgTime: 45, engagement: 80 },
    { date: "Tue", accuracy: 78, avgTime: 42, engagement: 85 },
    { date: "Wed", accuracy: 72, avgTime: 48, engagement: 75 },
    { date: "Thu", accuracy: 82, avgTime: 40, engagement: 90 },
    { date: "Fri", accuracy: 85, avgTime: 38, engagement: 92 },
  ];

  const emotionData = [
    { topic: "Math", focused: 45, confused: 30, happy: 20, frustrated: 5 },
    { topic: "Science", focused: 40, confused: 35, happy: 15, frustrated: 10 },
    { topic: "Coding", focused: 35, confused: 40, happy: 15, frustrated: 10 },
    { topic: "English", focused: 50, confused: 25, happy: 20, frustrated: 5 },
  ];

  const students = [
    {
      name: "Alice Johnson",
      accuracy: 92,
      topics: "Math, Science",
      emotion: "focused",
      trend: "up",
    },
    {
      name: "Bob Smith",
      accuracy: 78,
      topics: "Coding",
      emotion: "confused",
      trend: "down",
    },
    {
      name: "Carol Davis",
      accuracy: 88,
      topics: "English, Math",
      emotion: "happy",
      trend: "up",
    },
    {
      name: "David Lee",
      accuracy: 65,
      topics: "Science, Coding",
      emotion: "frustrated",
      trend: "down",
    },
  ];

  const struggledTopics = [
    { topic: "Trigonometry", struggles: 45, avgAccuracy: 62 },
    { topic: "Organic Chemistry", struggles: 38, avgAccuracy: 68 },
    { topic: "Data Structures", struggles: 42, avgAccuracy: 58 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <UserCircle className="w-8 h-8 text-indigo-600" />
              Teacher Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Monitor and guide your students' progress
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">
              <BookOpen className="w-4 h-4" />
              Create Quiz
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Students",
              value: 24,
              icon: <Users className="w-8 h-8 text-indigo-600" />,
            },
            {
              label: "Avg Accuracy",
              value: "78%",
              icon: <Trophy className="w-8 h-8 text-green-500" />,
            },
            {
              label: "Engagement",
              value: "84%",
              icon: <Brain className="w-8 h-8 text-indigo-600" />,
            },
            {
              label: "At Risk",
              value: 3,
              icon: <AlertCircle className="w-8 h-8 text-red-500" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-1">
              Class Performance Trends
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Accuracy and engagement over time
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={classPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Accuracy %"
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#6366f1"
                  strokeWidth={2}
                  name="Engagement %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-1">
              Emotion Heatmap by Topic
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Student emotional engagement patterns
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={emotionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="topic" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="focused" fill="#22c55e" name="Focused" />
                <Bar dataKey="confused" fill="#a855f7" name="Confused" />
                <Bar dataKey="frustrated" fill="#ef4444" name="Frustrated" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Students + Struggled Topics */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Student Overview */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Users className="w-5 h-5" />
              Student Overview
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Individual student performance
            </p>
            <div className="space-y-3">
              {students.map((student, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <UserCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.topics}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold">{student.accuracy}%</p>
                      <span className="inline-block text-xs border border-gray-300 rounded px-2 py-0.5 capitalize">
                        {student.emotion}
                      </span>
                    </div>
                    <TrendingUp
                      className={`w-5 h-5 ${
                        student.trend === "up"
                          ? "text-green-500"
                          : "text-red-500 rotate-180"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Struggled Topics */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Topics Needing Attention
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Areas where students struggle most
            </p>
            <div className="space-y-5">
              {struggledTopics.map((topic, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{topic.topic}</h4>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-md">
                      {topic.struggles}% struggling
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Class Average</span>
                    <span className="font-medium text-gray-800">
                      {topic.avgAccuracy}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: { ...topic.avgAccuracy } }}
                    />
                  </div>
                  <button className="border border-gray-300 text-sm py-1.5 w-full rounded-md hover:bg-gray-100 transition">
                    Generate Remedial Content
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
