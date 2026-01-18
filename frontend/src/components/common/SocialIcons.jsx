import { Github, Linkedin, Twitter } from "lucide-react";

const SocialIcons = () => {
  return (
    <div className="flex gap-4">
      <a href="#" className="hover:text-primary">
        <Github />
      </a>
      <a href="#" className="hover:text-primary">
        <Linkedin />
      </a>
      <a href="#" className="hover:text-primary">
        <Twitter />
      </a>
    </div>
  );
};

export default SocialIcons;
