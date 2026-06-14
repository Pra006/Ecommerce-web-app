import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Share2,
  Star,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/shopping/home" },
    { label: "Products", href: "/shopping/listing" },
    { label: "My Account", href: "/shopping/account" },
    { label: "Cart", href: "/shopping/cart" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ];

  const supportLinks = [
    { label: "FAQs", href: "#" },
    { label: "Track Order", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Shipping Info", href: "#" },
  ];

  const socialLinks = [
    { icon: Send, href: "#", label: "Email" },
    { icon: MessageCircle, href: "#", label: "Chat" },
    { icon: Share2, href: "#", label: "Share" },
    { icon: Star, href: "#", label: "Reviews" },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
  };

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-1">
            <h3 className="text-white text-xl font-bold mb-3">Ecommerce</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Your one-stop shop for quality products at unbeatable prices.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center group"
                  >
                    <Icon className="w-5 h-5 text-slate-300 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          \
          <div>
            <h4 className="text-white font-semibold mb-3">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-3">
              Subscribe to get special offers and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 py-4 border-t border-b border-slate-700">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h5 className="text-white font-semibold mb-1">Call Us</h5>
              <p className="text-slate-400 text-sm">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h5 className="text-white font-semibold mb-1">Email Us</h5>
              <p className="text-slate-400 text-sm">support@ecommerce.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h5 className="text-white font-semibold mb-1">Location</h5>
              <p className="text-slate-400 text-sm">
                123 Business St, City, State
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-4">
          <p className="text-slate-400 text-sm text-center md:text-left mb-4 md:mb-0">
            © {currentYear} Ecommerce Store. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by Ecommerce Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
