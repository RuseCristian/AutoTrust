import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo/logo.ico";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-800 py-10">
      <div className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20">
        {/* Flex container for logo, company name, and navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src={Logo} alt="Logo" height={48} className="mr-3" />
              <span className="text-xl font-semibold">AutoTrust</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row md:space-x-10 text-center md:text-left">
            <Link href="/about" className="hover:text-gray-600 mb-2 md:mb-0">
              About Us
            </Link>
            <Link href="/services" className="hover:text-gray-600 mb-2 md:mb-0">
              Services
            </Link>
            <Link href="/contact" className="hover:text-gray-600 mb-2 md:mb-0">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-gray-600">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p>© {currentYear} AutoTrust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
