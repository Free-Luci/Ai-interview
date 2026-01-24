import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import useTypingEffect from "../hooks/useTypingEffect";
import { Link } from "react-router-dom";
import ResumeCTA from "../components/ResumeCTA";

const messages = [
  "Frontend interviews • Live practice",
  "Backend interviews • AI evaluation",
  "MERN stack interviews • Real questions",
  "Machine Learning interviews • Fresher focused",
];

const Landing = () => {
  const animatedText = useTypingEffect(messages, 60, 1400);

  return (
    <>

      {/* <Header /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main>

          {/* HERO */}
          <section id="hero" className="min-h-[85vh] flex items-center py-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                  Prepare Smarter for{" "}
                  <span className="text-primary">Interviews</span>
                </h1>

                <p className="mt-4 text-lg sm:text-xl md:text-2xl font-medium text-primary min-h-[3rem]">
                  {animatedText}
                  <span className="animate-pulse">|</span>
                </p>

                <p className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-base-content/70 leading-relaxed">
                  AI Interview Coach is a practice platform designed for
                  freshers and early-career developers to simulate real
                  interviews, receive structured AI feedback, and confidently
                  improve their answers before real interviews.
                </p>

                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* <a href="/login" className="btn btn-primary btn-lg px-6 sm:px-10 py-4 text-center">
                    Login
                  </a>
                  <a href="/signup" className="btn btn-outline btn-lg px-6 sm:px-10 py-4 text-center">
                    Get Started
                  </a> */}
                  <Link to="/login" className="btn btn-primary btn-lg px-6 sm:px-10 py-4 text-center">
  Login
</Link>

<Link to="/signup" className="btn btn-outline btn-lg px-6 sm:px-10 py-4 text-center">
  Get Started
</Link>

                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative w-full max-w-[400px] lg:max-w-[460px]">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Interview illustration showing professionals discussing"
                    className="w-full h-auto rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
                    loading="eager"
                    width="460"
                    height="460"
                  />
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50 -z-10 group-hover:opacity-70 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </section>
{/* RESUME AI CTA */}
<ResumeCTA />
          {/* ABOUT */}
          <section id="about" className="py-16 sm:py-20 lg:py-28">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              About the Platform
            </h2>

            <p className="text-base sm:text-lg text-base-content/70 max-w-3xl leading-relaxed">
              AI Interview Coach replicates real interview scenarios using
              carefully designed prompts and AI evaluation logic. Instead of
              generic answers, users receive structured feedback on clarity,
              correctness, strengths, and improvement areas.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-10 sm:mt-14">
              {[
                {
                  title: "Role-Based Interviews",
                  desc: "Practice frontend, backend, MERN stack, and ML interviews tailored to fresher-level expectations.",
                  icon: "🎯"
                },
                {
                  title: "AI-Powered Feedback",
                  desc: "Each answer is evaluated once per submission to ensure cost efficiency and consistent feedback.",
                  icon: "🤖"
                },
                {
                  title: "Learning-Oriented Design",
                  desc: "No system-design overload. Simple language, actionable feedback, and follow-up questions.",
                  icon: "📚"
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card bg-base-100 shadow-xl p-6 sm:p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="text-3xl sm:text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section
            id="help"
            className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 bg-gradient-to-br from-base-200 to-base-300 rounded-2xl"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 sm:mb-12 text-center">
                How It <span className="text-primary">Works</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
                {[
                  {
                    step: "1",
                    title: "Choose a Role",
                    desc: "Select frontend, backend, MERN, or ML interview tracks.",
                    icon: "🎯"
                  },
                  {
                    step: "2",
                    title: "Answer Questions",
                    desc: "Respond like a real interview using your own words.",
                    icon: "💬"
                  },
                  {
                    step: "3",
                    title: "Get AI Feedback",
                    desc: "Receive instant scores, improvements, and follow-ups.",
                    icon: "🌟"
                  },
                  {
                    step: "4",
                    title: "Improve & Repeat",
                    desc: "Practice again with better answers and confidence.",
                    icon: "🔄"
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group card bg-base-100 shadow-xl p-6 sm:p-8
                      transform transition-all duration-300
                      hover:-translate-y-3 hover:shadow-2xl
                      hover:border hover:border-primary/40
                      cursor-pointer relative overflow-hidden"
                  >
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="text-4xl sm:text-5xl font-extrabold text-primary mb-4
                        transition-all duration-300
                        group-hover:text-accent group-hover:scale-110">
                        {item.step}
                      </div>

                      <div className="text-3xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.icon}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                        {item.title}
                      </h3>

                      <p className="text-base-content/70 text-sm sm:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-16 sm:py-20 lg:py-28">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Contact & Support
            </h2>

            <p className="text-base sm:text-lg text-base-content/70 max-w-3xl leading-relaxed">
              For feedback, bug reports, or collaboration opportunities,
              feel free to reach out. This platform is actively evolving
              and community feedback is highly valued.
            </p>

            <div className="mt-6 sm:mt-8 space-y-3 text-base sm:text-lg">
              <p>
                📧 Email: <strong className="text-primary">support@aiinterviewcoach.com</strong>
              </p>
              <p>
                💻 GitHub: <strong className="text-primary">github.com/ai-interview-coach</strong>
              </p>
              <p>
                🐦 Twitter: <strong className="text-primary">@AIInterviewCoach</strong>
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <a 
                href="mailto:support@aiinterviewcoach.com" 
                className="btn btn-outline btn-lg px-8 hover:scale-105 transition-transform duration-300"
              >
                Contact Us
              </a>
            </div>
          </section>
        </main>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Landing;