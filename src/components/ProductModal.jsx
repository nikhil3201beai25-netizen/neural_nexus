import React, { useState } from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  ShoppingBag, 
  PhoneCall, 
  ShieldCheck, 
  Truck, 
  BadgePercent,
  Plus,
  Minus,
  MessageCircle,
  FlaskConical,
  HelpCircle
} from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart, lang }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Namaste AgriConnect! I want to order/inquire about: ${product.name} (${product.packSize}) at ₹${product.price}. Please provide delivery details to my village.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-fadeIn my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image & Badges side */}
          <div className="relative bg-slate-100 p-6 flex flex-col justify-between">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200/80">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Doorstep delivery available across all Taluks & Blocks</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine Certified Batch with QR Authenticity</span>
              </div>
            </div>
          </div>

          {/* Details Side */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-agri-700 uppercase tracking-wide">
                  {product.brand}
                </span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-1">
                {product.name}
              </h2>
              <p className="text-sm font-semibold text-slate-500 mb-3">
                {product.hindiName}
              </p>

              {/* Price block */}
              <div className="flex items-baseline gap-3 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-3xl font-black text-slate-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-rose-100 text-rose-700 text-xs font-black px-2 py-0.5 rounded-lg">
                    {product.discount}
                  </span>
                )}
                <span className="text-xs text-slate-500 ml-auto font-medium">
                  Pack: <strong>{product.packSize}</strong>
                </span>
              </div>

              {/* Subsidy Banner */}
              {product.subsidyEligible && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                  <BadgePercent className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-950">Govt Subsidy Support Available</p>
                    <p className="text-[11px] text-amber-800">
                      Eligible for 40-50% subsidy under SMAM / State Agri Mechanization portals. GST invoice provided for subsidy claim.
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Technical Specs */}
              {product.specs && (
                <div className="mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Technical Specifications:
                  </h4>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-0.5 border-b border-slate-200/50 last:border-0">
                        <span className="text-slate-500">{key}:</span>
                        <span className="font-bold text-slate-800 text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dosage / Usage Instructions */}
              {product.dosageInstructions && (
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
                    <FlaskConical className="w-4 h-4 text-emerald-700" />
                    <span>Scientific Application & Dosage:</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {product.dosageInstructions}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-900">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, qty);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 bg-agri-600 hover:bg-agri-700 text-white font-bold text-sm rounded-xl shadow-md shadow-agri-600/25 flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {qty} to Cart (₹{(product.price * qty).toLocaleString('en-IN')})</span>
                </button>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Order on WhatsApp / Talk to Krishi Agronomist</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
