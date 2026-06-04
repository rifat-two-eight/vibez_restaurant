import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#013622] pb-12 pt-20 text-white/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-4">
            <Link href="/">
              <Image src="/logo2.svg" alt="Logo" width={100} height={100} />
            </Link>
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-zinc-300">
              Connecting people with the best local food experiences while helping restaurants grow.
            </p>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">Discovery</h3>
                <ul className="mt-6 space-y-4 text-sm text-zinc-300">
                  <li><a href="#" className="transition-colors hover:text-white">Restaurants</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Company</h3>
                <ul className="mt-6 space-y-4 text-sm text-zinc-300">
                  <li><a href="#" className="transition-colors hover:text-white">Join us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Support</h3>
                <ul className="mt-6 space-y-4 text-sm text-zinc-300">
                  <li><a href="#" className="transition-colors hover:text-white">FAQ</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Follow Us</h3>
                <ul className="mt-6 space-y-4 text-sm text-zinc-300 flex gap-4">
                  <li><Link href="#">
                    <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
                  </Link></li>
                  <li><Link href="#">
                    <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
                  </Link></li>
                  <li><Link href="#">
                    <Image src="/tiktok.svg" alt="X" width={24} height={24} />
                  </Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 border-t-2 border-white/30 pt-10">
          <p className="text-center text-sm text-zinc-400">
            © {new Date().getFullYear()} VIBEZ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
