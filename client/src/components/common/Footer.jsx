import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: "Company", links: ["About Us", "Our Team", "Careers", "Contact"] },
    { title: "Services", links: ["Buy Property", "Sell Property", "Rentals", "Investment"] },
    { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Use", "FAQ"] },
  ];

  // Using Inline SVGs to avoid "Module Not Found" errors forever
  const socialIcons = [
    { 
      name: "Facebook",
      href: "#",
      Icon: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      )
    },
    { 
      name: "Instagram",
      href: "#",
      Icon: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      )
    },
    { 
      name: "Twitter",
      href: "#",
      Icon: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
        </svg>
      )
    },
    { 
      name: "Linkedin",
      href: "#",
      Icon: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
        </svg>
      )
    },
  ];

  return (
    <footer className="bg-[#0b0f1a] text-white pt-20 pb-10 px-6 md:px-12 lg:px-24 w-full font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-2xl font-black tracking-tighter flex items-center gap-2"
            >
              <span className="text-blue-600">🏠</span> DreamDwell
            </motion.div>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm">
              Revolutionizing the real estate journey with transparency, 
              intelligence, and world-class service. Find your sanctuary with us.
            </p>
            <div className="flex gap-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  whileHover={{ y: -5, textShadow: "0px 0px 8px rgb(37, 99, 235)" }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-500">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
                      className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-white/5 mb-10">
          <div className="flex items-center gap-4 text-gray-400">
            <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500"><Mail size={20} /></div>
            <span>contact@dreamdwell.com</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500"><Phone size={20} /></div>
            <span>+1 (555) 000-1234</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500"><MapPin size={20} /></div>
            <span>123 Realty Blvd, NY 10001</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="font-bold text-gray-400">DreamDwell</span>. Built for the future of living.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-600">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Cookies</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;