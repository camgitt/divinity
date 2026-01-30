import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { UserPlus, MessageSquare, Sparkles } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: "Choose Your Guide",
    description: "Select from our diverse community of spiritual guides across 12 faith traditions.",
    color: "from-blue-500 to-blue-600"
  },
  {
    step: 2,
    icon: MessageSquare,
    title: "Share Your Journey",
    description: "Tell us about your spiritual background, goals, and preferred communication style.",
    color: "from-purple-500 to-purple-600"
  },
  {
    step: 3,
    icon: Sparkles,
    title: "Begin Your Transformation",
    description: "Start receiving personalized guidance, daily reflections, and spiritual support.",
    color: "from-teal-500 to-teal-600"
  }
];

interface OnboardingStepsProps {
  onStartJourney: () => void;
}

export function OnboardingSteps({ onStartJourney }: OnboardingStepsProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl mb-6 text-slate-800">
            Ready to Begin Your <span className="text-purple-600">Transformation?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            In just three simple steps, you'll be connected with your personalized spiritual guide, ready to support your journey of growth and discovery.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white">
                  {/* Step Number */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center text-xl mx-auto mb-6 shadow-lg`}>
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 mx-auto mb-6 text-slate-600">
                    <Icon className="w-full h-full" />
                  </div>
                  
                  <h3 className="text-xl mb-4 text-slate-800">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </Card>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 transform -translate-y-1/2 z-10" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-2xl">
            <h3 className="text-3xl mb-6">Your Spiritual Journey Awaits</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands who have discovered deeper meaning, peace, and personal growth through DivinityAGI's personalized spiritual guidance.
            </p>
            
            <Button
              onClick={onStartJourney}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Your Journey
            </Button>
            
            <div className="mt-8 grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
              <div>
                <div className="text-2xl mb-1">Free</div>
                <div className="text-sm text-slate-400">Trial Available</div>
              </div>
              <div>
                <div className="text-2xl mb-1">Safe</div>
                <div className="text-sm text-slate-400">& Private</div>
              </div>
              <div>
                <div className="text-2xl mb-1">24/7</div>
                <div className="text-sm text-slate-400">Support</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}