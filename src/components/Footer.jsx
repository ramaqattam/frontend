// Footer.jsx
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { colorTheme } from "./ColorTheme";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('footer');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const companyLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" }
  ];

  return (
    <div 
      className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700 pt-14 pb-10 px-5 relative overflow-hidden"
      id="footer"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-2 border-emerald-200 opacity-20"></div>
        <div className="absolute bottom-10 -left-10 w-40 h-40 rounded-full border-2 border-amber-200 opacity-30"></div>
        <div className="absolute top-40 left-1/4 w-6 h-6 rounded-full bg-emerald-500 opacity-10 animate-pulse" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-amber-500 opacity-10 animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20 md:gap-10 relative z-10">
        {/* Left Footer */}
        <div 
          className={`flex-1 min-w-[250px] transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <img 
            className="w-40 mb-6 hover:scale-105 transition-transform duration-300" 
            src={assets.MainLogo} 
            alt="MedEasy Logo" 
          />
          <p className="text-sm leading-6 text-gray-600">
            MedEasy connects patients with top healthcare professionals through our advanced booking platform. 
            We're dedicated to making healthcare accessible, efficient, and personalized for everyone.
          </p>
          
          <div className="mt-6 flex gap-4">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, index) => {
              const colorIndex = index % colorTheme.accent.length;
              const color = colorTheme.accent[colorIndex];
              return (
                <div 
                  key={social}
                  className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-gradient-to-br ${color.light} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  style={{
                    transitionDelay: `${100 * index}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div className={`w-5 h-5 rounded-sm bg-gradient-to-br ${color.gradient} opacity-80`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Footer */}
        <div 
          className={`flex-1 min-w-[150px] transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{transitionDelay: '200ms'}}
        >
          <h3 className={`text-lg font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${colorTheme.primary.gradient}`}>
            COMPANY
          </h3>
          <ul className="space-y-4 text-sm">
            {companyLinks.map((link, index) => (
              <li 
                key={link.name}
                onMouseEnter={() => setActiveLink(link.name)}
                onMouseLeave={() => setActiveLink(null)}
                className={`cursor-pointer transition-all duration-300 transform ${
                  activeLink === link.name ? colorTheme.primary.text + ' translate-x-2' : 'text-gray-700 hover:text-emerald-500'
                }`}
                style={{
                  transitionDelay: `${50 * index}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? activeLink === link.name ? 'translateX(8px)' : 'translateX(0)'
                    : 'translateX(-20px)'
                }}
                onClick={() => console.log(`Navigating to ${link.path}`)}
              >
                {activeLink === link.name ? '→ ' : ''}{link.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Footer */}
        <div 
          className={`flex-1 min-w-[200px] transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{transitionDelay: '400ms'}}
        >
          <h3 className={`text-lg font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${colorTheme.secondary.gradient}`}>
            GET IN TOUCH
          </h3>
          <ul className="space-y-4 text-sm">
            <li 
              className={`flex items-center gap-2 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{transitionDelay: '500ms'}}
            >
              <span className={`w-8 h-8 bg-gradient-to-br ${colorTheme.primary.light} rounded-full flex items-center justify-center ${colorTheme.primary.text}`}>
                📞
              </span>
              <span>+962-780-780-133</span>
            </li>
            <li 
              className={`flex items-center gap-2 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{transitionDelay: '600ms'}}
            >
              <span className={`w-8 h-8 bg-gradient-to-br ${colorTheme.secondary.light} rounded-full flex items-center justify-center ${colorTheme.secondary.text}`}>
                ✉️
              </span>
              <span>MedEasy@gmail.com</span>
            </li>
            <li 
              className={`mt-4 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{transitionDelay: '700ms'}}
            >
              <button className={`bg-gradient-to-r ${colorTheme.secondary.gradient} text-white px-6 py-2 rounded-md hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div 
        className={`border-t border-gray-300 mt-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{transitionDelay: '800ms'}}
      >
        <div className="max-w-7xl mx-auto py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MedEasy. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;