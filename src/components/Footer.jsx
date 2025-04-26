import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-gray-700 pt-14 pb-10 px-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20 md:gap-10">

        {/* Left Footer */}
        <div className="flex-1 min-w-[250px]">
          <img className="w-40 mb-6" src={assets.MainLogo} alt="MedEasy Logo" />
          <p className="text-sm leading-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur a deleniti cum perspiciatis voluptate accusamus in,
            reprehenderit eum tenetur ab beatae, tempore necessitatibus, debitis harum voluptatem repellat! Eligendi, deleniti atque.
          </p>
        </div>

        {/* Center Footer */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-lg font-bold mb-6">COMPANY</h3>
          <ul className="space-y-4 text-sm">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
    
        {/* Right Footer */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-bold mb-6">GET IN TOUCH</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2">
              📞 +962-780-780-133
            </li>
            <li className="flex items-center gap-2">
              ✉️ MedEasy@gmail.com
            </li>
          </ul>
        </div>

      </div>
     {/* Bottom copyright bar */}
     <div className="border-t border-gray-300 mt-5">
        <div className="max-w-7xl mx-auto py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MedEasy. All rights reserved.
        </div>
      </div>
    </div>
  );
};
export default Footer;
