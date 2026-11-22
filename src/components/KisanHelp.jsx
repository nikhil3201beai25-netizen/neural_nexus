import React from 'react';
import { GOVT_SCHEMES } from '../data/advisoriesData';
import { 
  Sparkles, 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  HelpCircle, 
  ExternalLink,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function KisanHelp({ lang }) {
  const faqs = [
    {
      q: "How can I avail 40% to 50% government subsidy on agricultural sprayers & implements?",
      a: "Under the SMAM (Sub-Mission on Agricultural Mechanization) scheme, farmers can register on agrimachinery.nic.in with their Aadhaar, Land Record (7/12 or Jamabandi), and Bank Passbook. AgriConnect provides GST-compliant serial numbered subsidy invoices required for state DBT disbursement."
    },
    {
      q: "Are the seeds certified by government seed certification agencies?",
      a: "Yes. Every seed packet sold on AgriConnect carries official Blue/White seed certification tags from National Seeds Corporation (NSC), State Seed Certification Agencies, or ICAR research institutes with verified germination (>85%) and genetic purity (>98%)."
    },
    {
      q: "How does village-level doorstep delivery work for small equipment and fertilizers?",
      a: "We deliver directly to your Gram Panchayat, local CSC center, or village doorstep within 3-5 working days. Cash on Delivery (COD) is available so you can inspect seed lot seals before paying."
    },
    {
      q: "What should I do if my crop is attacked by unidentifiable pests or disease?",
      a: "Call the Kisan Call Centre at Toll-Free 1800-180-1551 (6 AM to 10 PM in 22 regional Indian languages) or click the WhatsApp Krishi Mitra button below to send clear photos of affected leaves to our agronomist panel."
    }
  ];

  return (
    <div id="kisan-schemes-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'hi' ? 'किसान सहायता व सरकारी योजनाएं' : 'Farmer Support, Schemes & Helplines'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'प्रमुख सरकारी योजनाएं व 24x7 किसान सहायता' : 'Government Agricultural Schemes & Kisan Support Desk'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {lang === 'hi'
              ? 'कृषि यंत्रीकरण (SMAM), पीएम-किसान, फसल बीमा और निःशुल्क किसान कॉल सेंटर से सीधे जुड़ें।'
              : 'Direct links to official subsidy portals, income support schemes, and toll-free farmer advisory hotlines.'}
          </p>
        </div>

        {/* Helpline Contact Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          
          <div className="bg-gradient-to-r from-emerald-800 to-agri-900 text-white p-6 rounded-3xl shadow-md flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 text-emerald-200">
                Toll-Free Govt Hotline
              </span>
              <h3 className="text-xl font-black mt-2">Kisan Call Centre (KCC)</h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                Available in Hindi, Punjabi, Marathi, Telugu, Tamil, Bengali & all regional languages.
              </p>
              <a
                href="tel:18001801551"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white text-emerald-950 font-black text-xs rounded-xl shadow-md hover:bg-emerald-50 transition"
              >
                <PhoneCall className="w-4 h-4 text-emerald-700" />
                <span>Call 1800-180-1551 (Toll Free)</span>
              </a>
            </div>
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white/10 items-center justify-center text-emerald-300 shrink-0">
              <PhoneCall className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-md flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 text-emerald-100">
                WhatsApp Agronomy Desk
              </span>
              <h3 className="text-xl font-black mt-2">Krishi Mitra WhatsApp Help</h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                Send photos of your crop pest or soil report for instant diagnosis from ICAR certified experts.
              </p>
              <a
                href="https://wa.me/919876543210?text=Namaste%20AgriConnect!%20I%20need%20expert%20crop%20advisory%20for%20my%20farm."
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-950 text-white font-black text-xs rounded-xl shadow-md hover:bg-slate-900 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp (+91 98765 43210)</span>
              </a>
            </div>
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white/10 items-center justify-center text-emerald-200 shrink-0">
              <MessageCircle className="w-8 h-8" />
            </div>
          </div>

        </div>

        {/* Govt Schemes Grid */}
        <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-agri-600" />
          <span>Key Government Agricultural Schemes for Indian Farmers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {GOVT_SCHEMES.map((scheme) => (
            <div
              key={scheme.id}
              className="p-5 rounded-3xl bg-slate-50 border border-slate-200 hover:border-agri-300 hover:bg-white transition-all shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {scheme.name}
                  </h4>
                  <p className="text-xs font-semibold text-agri-700">
                    {scheme.hindiName}
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                  Govt of India
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                <strong className="text-slate-800">Benefits: </strong>
                {scheme.benefits}
              </p>

              <div className="text-[11px] text-slate-500 mb-4">
                <strong>Eligibility: </strong>{scheme.eligibility}
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">Official: {scheme.portal}</span>
                <a
                  href={`https://${scheme.portal}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-agri-700 hover:text-agri-800 flex items-center gap-1"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
          <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-agri-600" />
            <span>Frequently Asked Questions by Farmers</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, fIdx) => (
              <div key={fIdx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-agri-100 text-agri-800 text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    Q
                  </span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
