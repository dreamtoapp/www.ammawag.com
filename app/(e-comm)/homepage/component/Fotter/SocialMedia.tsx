import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

const SocialMedia = () => (
  <div className="flex items-center justify-center  gap-8">
    {[
      { icon: <FacebookIcon size={20} />, link: "#", label: "Facebook" },
      { icon: <InstagramIcon size={20} />, link: "#", label: "Instagram" },
      { icon: <TwitterIcon size={20} />, link: "#", label: "Twitter" },
      { icon: <LinkedinIcon size={20} />, link: "#", label: "LinkedIn" },
    ].map((social, index) => (
      <a
        key={index}
        href={social.link}
        aria-label={social.label}
        className="text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        {social.icon}
      </a>
    ))}
  </div>
);
export default SocialMedia;
