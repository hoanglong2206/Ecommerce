import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const SITEMAP = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Our Team", "Projects"],
    },
    {
      title: "Help Center",
      links: ["Discord", "Twitter", "GitHub", "Contact Us"],
    },
    {
      title: "Resources",
      links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
    },
    {
      title: "Products",
      links: ["Phones", "Laptops", "Desktops", "Accessories"],
    },
  ];
  return (
    <footer className="relative w-full bg-slate-100">
      <div className="w-full max-w-7xl mx-auto px-6 shadow-sm pt-2">
        <div className="grid sm:gap-x-16 sm:grid-cols-2 lg:grid-cols-4 w-full gap-y-8 mx-auto grid-cols-1 py-4">
          {SITEMAP.map(({ title, links }, key) => (
            <FooterList key={key} title={title}>
              {links.map((link, key) => (
                <Link key={key} to="#">
                  {link}
                </Link>
              ))}
            </FooterList>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-gray-200 py-2 md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Demo App, Inc. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <LinkButton to="#">
              <FaFacebook className="h-5 w-5" />
            </LinkButton>
            <LinkButton to="#">
              <FaInstagram className="h-5 w-5" />
            </LinkButton>
            <LinkButton to="#">
              <FaTwitter className="h-5 w-5" />
            </LinkButton>
            <LinkButton to="#">
              <FaYoutube className="h-5 w-5" />
            </LinkButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

interface FooterListProps {
  title: string;
  children: React.ReactNode;
}

const FooterList = ({ title, children }: FooterListProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center sm:items-start ">
      <h3 className="text-lg font-semibold uppercase">{title}</h3>
      {children}
    </div>
  );
};

interface LinkButtonProps {
  to: string;
  children: React.ReactNode;
}

const LinkButton = ({ to, children }: LinkButtonProps) => {
  return (
    <Link to={to}>
      <Button variant={"ghost"} size={"icon"} className="rounded-full">
        {children}
      </Button>
    </Link>
  );
};
