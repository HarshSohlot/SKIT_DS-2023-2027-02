import React from 'react';
import { HeartHandshake, ShieldCheck, Heart, Award, Users } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: About CareKart */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span>Care<span className="text-emerald-400">Kart</span></span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              A real-time cross-platform food redistribution system connecting surplus food donors 
              with local NGOs and communities to eliminate hunger and reduce food wastage.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-xs font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>Mapped to UN SDG 2: Zero Hunger</span>
            </div>
          </div>

          {/* Col 2: Final Year Project Info */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" /> Academic Project
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><strong className="text-slate-200">Institution:</strong> SKIT Jaipur</li>
              <li><strong className="text-slate-200">Dept:</strong> Computer Science & Engg.</li>
              <li><strong className="text-slate-200">Batch:</strong> 2023 - 2027 (Data Science)</li>
              <li><strong className="text-slate-200">Project ID:</strong> SKIT/DS/2023-2027/02</li>
              <li><strong className="text-slate-200">Mentor:</strong> Mrs. Abha Jain (Asst. Prof.)</li>
              <li><strong className="text-slate-200">Coordinator:</strong> Dr. Sumit Mathur</li>
            </ul>
          </div>

          {/* Col 3: Team Members */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" /> Team DS-02
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex justify-between">
                <span>Harsh</span>
                <span className="text-emerald-400">Android Dev (Kotlin)</span>
              </li>
              <li className="flex justify-between">
                <span>Harshit Goyal</span>
                <span className="text-emerald-400">AI/ML Dev (Random Forest)</span>
              </li>
              <li className="flex justify-between">
                <span>Karan Garg</span>
                <span className="text-emerald-400">Backend Dev (Spring Boot)</span>
              </li>
              <li className="flex justify-between font-medium text-slate-200">
                <span>Kartavya Vashisth</span>
                <span className="text-emerald-400 font-semibold">Web Dev (React.js)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Security & Tech Stack */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Architecture
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">React.js</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">Tailwind CSS</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">JWT Security</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">Spring Boot</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">MongoDB Atlas</span>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">Python ML</span>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              RESTful APIs with strict JWT Bearer authentication compliant with NFR-002.
            </p>
          </div>

        </div>

        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026-2027 CareKart. Final Year Capstone Project. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Social Impact
          </p>
        </div>
      </div>
    </footer>
  );
};
