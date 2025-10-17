import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useStore } from "@/store/useStore";
import { adaptiveAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { FadeIn } from "@/components/AnimationWrapper";
import { Clock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QuizzesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadNextQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && currentQuestion) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentQuestion) {
      handleSubmit();
    }
  }, [timeLeft, currentQuestion]);

  const loadNextQuestion = async () => {
    setLoading(true);
    try {
      const { data } = await adaptiveAPI.getNextQuestion(
        user?.id || "demo",
        "JavaScript"
      );
      setCurrentQuestion(data.question);
      setSelectedAnswer(null);
      setTimeLeft(30);
      setTimeout(() => setLoading(false), 600); // smoother transition
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load question",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) return;
    try {
      await adaptiveAPI.submitAnswer(
        user?.id || "demo",
        currentQuestion.id,
        selectedAnswer,
        30 - timeLeft
      );

      if (questionNumber >= 10) {
        navigate("/results");
      } else {
        setQuestionNumber(questionNumber + 1);
        loadNextQuestion();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit answer",
        variant: "destructive",
      });
    }
  };

  const progress = (questionNumber / 10) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Floating animated background shapes */}
      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute bottom-10 right-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />

      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 backdrop-blur-sm">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 lg:p-8 flex items-center justify-center">
          <FadeIn className="w-full max-w-3xl">
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-wide">
                  Question {questionNumber}{" "}
                  <span className="text-muted-foreground">/ 10</span>
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <motion.span
                    key={timeLeft}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`text-lg font-semibold ${
                      timeLeft < 10 ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {timeLeft}s
                  </motion.span>
                </div>
              </div>
              <Progress
                value={progress}
                className="h-2 rounded-full bg-slate-700"
              />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              {!loading && currentQuestion && (
                <motion.div
                  key={currentQuestion.id}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  <Card className="border-0 glass-card bg-slate-900/70 backdrop-blur-xl shadow-2xl">
                    <CardContent className="p-8 md:p-12">
                      <motion.h3
                        className="text-2xl md:text-3xl font-bold mb-10 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {currentQuestion.question ||
                          "What is the time complexity of binary search?"}
                      </motion.h3>

                      <RadioGroup
                        value={selectedAnswer || ""}
                        onValueChange={setSelectedAnswer}
                        className="space-y-4"
                      >
                        {(
                          currentQuestion.options || [
                            "O(n)",
                            "O(log n)",
                            "O(n²)",
                            "O(1)",
                          ]
                        ).map((option, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.3 + index * 0.1,
                              type: "spring",
                              stiffness: 120,
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Label
                              htmlFor={`option-${index}`}
                              className={`flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                                selectedAnswer === option
                                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/30"
                                  : "border-slate-700 hover:border-primary/40 hover:bg-slate-800/50"
                              }`}
                            >
                              <RadioGroupItem
                                value={option}
                                id={`option-${index}`}
                                className="shrink-0"
                              />
                              <span className="text-base md:text-lg font-medium flex-1">
                                {option}
                              </span>
                              {selectedAnswer === option && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2 h-2 rounded-full bg-primary"
                                />
                              )}
                            </Label>
                          </motion.div>
                        ))}
                      </RadioGroup>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Button
                          onClick={handleSubmit}
                          disabled={!selectedAnswer}
                          className="w-full mt-10 h-14 text-lg font-semibold bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-all duration-300 group"
                        >
                          {questionNumber === 10
                            ? "Finish Quiz"
                            : "Next Question"}
                          <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Shimmer Skeleton Loader */}
            {loading && (
              <Card className="border-0 bg-slate-900/70 backdrop-blur-xl shadow-lg">
                <CardContent className="p-10 space-y-6 animate-pulse">
                  <div className="h-6 w-1/2 bg-slate-700 rounded-lg shimmer" />
                  <div className="space-y-4 mt-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-14 bg-slate-800/80 rounded-xl shimmer"
                      />
                    ))}
                  </div>
                  <div className="h-14 w-full bg-slate-700/90 rounded-xl shimmer mt-10" />
                </CardContent>
              </Card>
            )}
          </FadeIn>
        </main>
      </div>
    </div>
  );
};

export default QuizzesPage;
