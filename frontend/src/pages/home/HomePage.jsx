import { useNavigate } from "react-router-dom";
import {
  Brain,
  Camera,
  LineChart,
  Sparkles,
  TrendingUp,
  Users,
  Target,
  Zap,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Emotion Detection",
      description:
        "Real-time facial expression analysis tracks student engagement and confusion during quizzes.",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Adaptive Learning",
      description:
        "AI personalizes question difficulty based on performance, emotions, and response time.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Performance Analytics",
      description:
        "Comprehensive dashboards show accuracy trends, topic mastery, and emotional patterns.",
      gradient: "from-green-500 to-blue-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Teacher Insights",
      description:
        "Identify struggling students and topics, with AI-generated remedial content suggestions.",
      gradient: "from-pink-500 to-blue-500",
    },
  ];

  const benefits = [
    {
      icon: <Target className="w-5 h-5" />,
      text: "Personalized learning paths",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "Track emotional engagement",
    },
    { icon: <Sparkles className="w-5 h-5" />, text: "AI-powered insights" },
    { icon: <Zap className="w-5 h-5" />, text: "Real-time adaptation" },
  ];

  return (
    <div className="min-h-screen font-sans bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium">
              AI-Powered Adaptive Learning
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LearnX Pro
            </span>
            <br />
            <span className="text-gray-800">Emotion-Aware Tutoring</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in">
            The first adaptive quiz platform that personalizes learning based on
            your performance, emotions, and engagement in real-time.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12 animate-slide-up">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm"
              >
                <div className="text-indigo-600">{benefit.icon}</div>
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center animate-fade-in">
            <button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-md hover:opacity-90 transition"
            >
              Get Started
            </button>
            <button className="border border-gray-300 text-lg px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Learning
          </h2>
          <p className="text-gray-600 text-lg">
            Combining AI, emotion analytics, and adaptive algorithms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-4 text-white`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Three simple steps to personalized learning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Take a Quiz",
                description:
                  "Choose your topic and start. Our system tracks your responses, time, and emotions.",
              },
              {
                step: "02",
                title: "AI Analyzes",
                description:
                  "Real-time analysis of accuracy, speed, and facial expressions identifies your learning patterns.",
              },
              {
                step: "03",
                title: "Get Personalized",
                description:
                  "Next questions adapt to your performance. Weak areas get more focus, with easier paths when confused.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students and teachers using AI-powered adaptive
            learning
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-white text-indigo-700 font-semibold text-lg px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Start Learning Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
