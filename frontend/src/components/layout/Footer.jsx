import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-300 px-8 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        <div>
          <h3 className="font-bold text-xl mb-3">
            AI Interview Coach
          </h3>
          <p className="text-base text-base-content/70 leading-relaxed">
            Practice interviews with AI-powered feedback and
            build confidence before real interviews.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Links</h3>
          <ul className="space-y-2 text-base">
            <li><a href="#about">About</a></li>
            <li><a href="#help">Help</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Connect</h3>
          <div className="flex gap-6">
            <Github className="cursor-pointer hover:text-primary" />
            <Linkedin className="cursor-pointer hover:text-primary" />
            <Twitter className="cursor-pointer hover:text-primary" />
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-base-content/60 mt-12">
        © 2026 AI Interview Coach. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
