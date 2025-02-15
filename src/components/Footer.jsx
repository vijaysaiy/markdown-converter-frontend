import { Copyright } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center gap-2  py-4 text-center text-sm">
      <Copyright size={18} />
      <p>
        {new Date().getFullYear()} Vijaysai. Submitted for Neokred as
        assignment.
      </p>
    </footer>
  );
};

export default Footer;
