import { Link } from "react-router-dom";
import { HardHat, Twitter, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import * as React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-white border-t border-zinc-800 pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <HardHat className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter">IEM LTD.</span>
            </Link>
            <p className="text-zinc-400 max-w-sm mb-10 leading-relaxed text-sm">
              Infrastructure Engineering Masters Ltd. is committed to delivering high-quality, durable engineering and digital solutions across Cameroon.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 text-lg uppercase tracking-wider">Engineering</h4>
            <ul className="space-y-4">
              <li><FooterLink href="/engineering">Structural Design</FooterLink></li>
              <li><FooterLink href="/engineering">Architecture</FooterLink></li>
              <li><FooterLink href="/engineering">Civil Works</FooterLink></li>
              <li><FooterLink href="/engineering">Consultancy</FooterLink></li>
              <li><FooterLink href="/engineering">Soil Testing</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 text-lg uppercase tracking-wider">Digital & Office</h4>
            <ul className="space-y-4">
              <li><FooterLink href="/printing">Premium Printing</FooterLink></li>
              <li><FooterLink href="/printing">Document Binding</FooterLink></li>
              <li><FooterLink href="/data-analysis">Data Analysis</FooterLink></li>
              <li><FooterLink href="/project-editing">Project Editing</FooterLink></li>
              <li><FooterLink href="/project-editing">Thesis Formatting</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 text-lg uppercase tracking-wider">Contact IEM</h4>
            <ul className="space-y-6">
              <li className="flex gap-3 items-start group">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <span className="text-zinc-400 text-sm group-hover:text-blue-400 transition-colors">Mile Six, Nkwen, Bamenda</span>
              </li>
              <li className="flex gap-3 items-start group">
                <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-zinc-400 text-sm group-hover:text-blue-400 transition-colors">+237 691 005 841</span>
                  <span className="text-zinc-400 text-sm group-hover:text-blue-400 transition-colors">+237 676 222 804</span>
                </div>
              </li>
              <li className="flex gap-3 items-start group">
                <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <span className="text-zinc-400 text-sm group-hover:text-blue-400 transition-colors">IEM@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500 font-bold uppercase tracking-widest">
          <p>© {currentYear} Infrastructure Engineering Masters Ltd. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Standard Verified
            </span>
            <Link to="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link to={href} className="text-zinc-400 hover:text-blue-400 transition-colors text-sm font-medium">
      {children}
    </Link>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 transition-all border border-zinc-700"
    >
      {icon}
    </a>
  );
}
