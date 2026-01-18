import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import useTypingEffect from "../hooks/useTypingEffect";

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
      <Header />

      <div className="max-w-7xl mx-auto px-6">
        <main>

          {/* HERO */}
          <section id="hero" className="min-h-[85vh] flex items-center">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                  Prepare Smarter for{" "}
                  <span className="text-primary">Interviews</span>
                </h1>

                <p className="mt-4 text-xl md:text-2xl font-medium text-primary">
                  {animatedText}
                  <span className="animate-pulse">|</span>
                </p>

                <p className="mt-8 max-w-xl text-lg text-base-content/70 leading-relaxed">
                  AI Interview Coach is a practice platform designed for
                  freshers and early-career developers to simulate real
                  interviews, receive structured AI feedback, and confidently
                  improve their answers before real interviews.
                </p>

                <div className="mt-10 flex gap-6">
                  <a href="/login" className="btn btn-primary btn-lg px-10">
                    Login
                  </a>
                  <a href="/signup" className="btn btn-outline btn-lg px-10">
                    Get Started
                  </a>
                </div>
              </div>

              <div className="flex justify-center">
                <img
                  src="https://illustrations.popsy.co/gray/interview.svg"
                  alt="Interview illustration"
                  className="w-[460px] animate-float"
                />
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" className="py-28">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About the Platform
            </h2>

            <p className="text-lg text-base-content/70 max-w-3xl leading-relaxed">
              AI Interview Coach replicates real interview scenarios using
              carefully designed prompts and AI evaluation logic. Instead of
              generic answers, users receive structured feedback on clarity,
              correctness, strengths, and improvement areas.
            </p>

            <div className="grid md:grid-cols-3 gap-10 mt-14">
              {[
                {
                  title: "Role-Based Interviews",
                  desc: "Practice frontend, backend, MERN stack, and ML interviews tailored to fresher-level expectations.",
                },
                {
                  title: "AI-Powered Feedback",
                  desc: "Each answer is evaluated once per submission to ensure cost efficiency and consistent feedback.",
                },
                {
                  title: "Learning-Oriented Design",
                  desc: "No system-design overload. Simple language, actionable feedback, and follow-up questions.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card bg-base-100 shadow-xl p-8 hover:-translate-y-2 hover:shadow-2xl transition-all"
                >
                  <h3 className="text-2xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base text-base-content/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section
            id="help"
            className="py-28 px-6 bg-gradient-to-br from-base-200 to-base-300 rounded-2xl"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center">
                How It <span className="text-primary">Works</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {[
                  {
                    step: "1",
                    title: "Choose a Role",
                    desc: "Select frontend, backend, MERN, or ML interview tracks.",
                  },
                  {
                    step: "2",
                    title: "Answer Questions",
                    desc: "Respond like a real interview using your own words.",
                  },
                  {
                    step: "3",
                    title: "Get AI Feedback",
                    desc: "Receive instant scores, improvements, and follow-ups.",
                  },
                  {
                    step: "4",
                    title: "Improve & Repeat",
                    desc: "Practice again with better answers and confidence.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group card bg-base-100 shadow-xl p-8
                      transform transition-all duration-300
                      hover:-translate-y-3 hover:shadow-2xl
                      hover:border hover:border-primary/40
                      cursor-pointer"
                  >
                    <div className="text-5xl font-extrabold text-primary mb-4
                      transition-colors duration-300
                      group-hover:text-accent">
                      {item.step}
                    </div>

                    <h3 className="text-2xl font-semibold mb-3">
                      {item.title}
                    </h3>

                    <p className="text-base-content/70 text-lg">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-28">
            <h2 className="text-4xl font-bold mb-6">
              Contact & Support
            </h2>

            <p className="text-lg text-base-content/70 max-w-3xl leading-relaxed">
              For feedback, bug reports, or collaboration opportunities,
              feel free to reach out. This platform is actively evolving
              and community feedback is highly valued.
            </p>

            <div className="mt-8 space-y-3 text-lg">
              <p>
                Email: <strong>support@aiinterviewcoach.com</strong>
              </p>
              <p>
                GitHub: <strong>github.com/ai-interview-coach</strong>
              </p>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Landing;
