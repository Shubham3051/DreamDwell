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
    <footer className="bg-[#1C1B1A] text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 w-full font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-black tracking-tighter uppercase italic flex items-center gap-2"
            >
              <span className="text-[#D4755B]">D</span>reamDwell
            </motion.div>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm">
              Crafting sanctuaries through visionary architecture and unparalleled service. Your journey home begins with a single, elegant step.
            </p>
            <div className="flex gap-5">
              {socialIcons.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4755B] hover:border-[#D4755B] transition-all duration-500"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4755B]">
                {section.title}
              </h4>
              <ul className="space-y-5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
                      className="text-gray-400 hover:text-white transition-all duration-300 font-medium text-sm tracking-wide"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10 border-y border-white/5 mb-12">
          <div className="flex items-center gap-5 text-gray-300">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#D4755B]"><Mail size={20} /></div>
            <span className="text-sm font-medium tracking-wide">contact@dreamdwell.com</span>
          </div>
          <div className="flex items-center gap-5 text-gray-300">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#D4755B]"><Phone size={20} /></div>
            <span className="text-sm font-medium tracking-wide">+1 (555) 000-1234</span>
          </div>
          <div className="flex items-center gap-5 text-gray-300">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#D4755B]"><MapPin size={20} /></div>
            <span className="text-sm font-medium tracking-wide">Hamirpur, Himachal Pradesh, India</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 text-xs tracking-widest uppercase font-bold">
            © {currentYear} <span className="text-white">DreamDwell</span> — Architecture for Life.
          </p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            <a href="#" className="hover:text-[#D4755B] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#D4755B] transition-colors">Cookies</a>
            <a href="#" className="hover:text-[#D4755B] transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;