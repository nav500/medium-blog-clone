import Image from "next/image";
import Link from "next/link";
import React from "react"

const Header: React.FC = () => {
  return (
    <header>
      <div className="flex justify-between items-center px-4 py-2 max-w-5xl mx-auto flex-wrap">
        <div className="flex items-center space-x-10 flex-wrap">
          <div>
            <Link href="/">
              <div className="w-32">
                <a>
                  <Image src="/medium-logo.svg" width="100%" height="40%" layout="responsive" objectFit="contain" alt="medium logo" />
                </a>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-5">
            <h3>About</h3>
            <h3>Contact</h3>
            <h3 className="px-4 py-2 bg-green-500 text-white rounded-2xl">Follow</h3>
          </div>
        </div>
        <div className="flex space-x-5 items-center">
          <h3 className="text-green-500">Sign In</h3>
          <h3 className="text-green-500 px-4 py-2 border border-green-500 rounded-2xl">Get Started</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;