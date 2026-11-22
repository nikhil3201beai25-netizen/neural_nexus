import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  Tag, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  CreditCard,
  Banknote,
  UserCheck
} from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart,
  currentUser,
  lang 
}) {
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Checkout form states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  const [formData, setFormData] = useState({
    farmerName: '',
    phone: '',
    village: '',
    district: '',
    state: 'Punjab',
    pincode: '',
    paymentMethod: 'cod'
  });

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        farmerName: currentUser.name || prev.farmerName,
        phone: currentUser.phone || prev.phone,
        state: currentUser.state || prev.state,
        district: currentUser.district || prev.district,
        village: currentUser.village || prev.village
      }));
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeShippingThreshold = 999;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal + shippingFee - couponDiscount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'KISAN50') {
      setCouponDiscount(50);
      setCouponApplied(true);
    } else if (code === 'AGRI10') {
      const disc = Math.round(subtotal * 0.1);
      setCouponDiscount(disc);
      setCouponApplied(true);
    } else {
      setCouponError('Invalid code. Use KISAN50 or AGRI10');
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!formData.farmerName || !formData.phone || !formData.village) {
      alert('Please fill in Farmer Name, Mobile Number, and Village address.');
      return;
    }

    const orderId = 'AGRI-' + Math.floor(100000 + Math.random() * 900000);
    setOrderPlaced({
      orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...formData,
      items: [...cartItems],
      total: grandTotal
    });
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-agri-600" />
              <h2 className="text-lg font-black text-slate-900">
                {lang === 'hi' ? 'आपकी किसान कार्ट' : 'Your Farm Cart'}
              </h2>
              <span className="bg-agri-100 text-agri-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {orderPlaced ? (
              /* ORDER CONFIRMATION SCREEN */
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-slate-500">
                  बधाई हो! आपका ऑर्डर प्राप्त हो गया है। ग्राम पंचायत स्तर पर त्वरित डिलीवरी की जाएगी।
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-slate-500">Order ID:</span>
                    <span className="font-extrabold text-agri-700">{orderPlaced.orderId}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-slate-500">Farmer Name:</span>
                    <span className="font-bold text-slate-800">{orderPlaced.farmerName}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-slate-500">Mobile / WhatsApp:</span>
                    <span className="font-bold text-slate-800">{orderPlaced.phone}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-slate-500">Village / District:</span>
                    <span className="font-bold text-slate-800">{orderPlaced.village}, {orderPlaced.district} ({orderPlaced.state})</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-slate-500">Payment Mode:</span>
                    <span className="font-bold text-slate-800 uppercase">{orderPlaced.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm font-extrabold">
                    <span>Total Amount:</span>
                    <span className="text-slate-900">₹{orderPlaced.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-[11px] text-amber-900">
                  <p><strong>SMS & WhatsApp Confirmation:</strong> Our regional agricultural coordinator will contact you shortly to confirm seed batch certificate and dispatch timings.</p>
                </div>

                <button
                  onClick={() => {
                    setOrderPlaced(null);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                  className="w-full py-3 bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs rounded-xl"
                >
                  Continue Browsing AgriConnect
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              /* EMPTY CART */
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-14 h-14 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500">
                  Explore high-yield seeds, fertilizers, and farm implements from our catalog.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-agri-600 text-white font-bold text-xs rounded-xl hover:bg-agri-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : isCheckingOut ? (
              /* CHECKOUT FORM */
              <form onSubmit={handleOrderSubmit} className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="text-sm font-black text-slate-900">
                    Farmer & Delivery Details
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-agri-700 font-bold hover:underline"
                  >
                    ← Back to Items
                  </button>
                </div>

                {currentUser && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-900">
                    <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Auto-filled from logged-in profile: <strong>{currentUser.name}</strong></span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Farmer Full Name (किसान का नाम) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar Patel"
                    value={formData.farmerName}
                    onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (WhatsApp SMS updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Village / Gram Panchayat *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Village name"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      District (ज़िला) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ludhiana / Pune"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      State / Zone
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-white"
                    >
                      <option value="Punjab">Punjab (North)</option>
                      <option value="Haryana">Haryana (North)</option>
                      <option value="Uttar Pradesh">Uttar Pradesh (North)</option>
                      <option value="Rajasthan">Rajasthan (North)</option>
                      <option value="Maharashtra">Maharashtra (West)</option>
                      <option value="Gujarat">Gujarat (West)</option>
                      <option value="Tamil Nadu">Tamil Nadu (South)</option>
                      <option value="Karnataka">Karnataka (South)</option>
                      <option value="Andhra Pradesh">Andhra Pradesh (South)</option>
                      <option value="West Bengal">West Bengal (East)</option>
                      <option value="Bihar">Bihar (East)</option>
                      <option value="Odisha">Odisha (East)</option>
                      <option value="Assam">Assam (East)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      placeholder="6-digit PIN"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Payment Method (भुगतान विकल्प)
                  </label>
                  <div className="space-y-2">
                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${formData.paymentMethod === 'cod' ? 'border-agri-600 bg-agri-50' : 'border-slate-200'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="text-agri-600 focus:ring-agri-500"
                      />
                      <Banknote className="w-5 h-5 text-emerald-600" />
                      <div className="text-xs">
                        <p className="font-extrabold text-slate-900">Cash on Delivery (COD) - सर्वाधिक लोकप्रिय</p>
                        <p className="text-slate-500">Pay cash upon delivery to your village or farm</p>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${formData.paymentMethod === 'kcc' ? 'border-agri-600 bg-agri-50' : 'border-slate-200'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="kcc"
                        checked={formData.paymentMethod === 'kcc'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'kcc' })}
                        className="text-agri-600 focus:ring-agri-500"
                      />
                      <CreditCard className="w-5 h-5 text-amber-600" />
                      <div className="text-xs">
                        <p className="font-extrabold text-slate-900">Kisan Credit Card (KCC) / RuPay</p>
                        <p className="text-slate-500">Avail 7% concessional interest rate crop credit</p>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${formData.paymentMethod === 'upi' ? 'border-agri-600 bg-agri-50' : 'border-slate-200'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                        className="text-agri-600 focus:ring-agri-500"
                      />
                      <span className="text-xs font-black text-sky-600 px-1 border border-sky-300 rounded">UPI</span>
                      <div className="text-xs">
                        <p className="font-extrabold text-slate-900">Instant UPI (GPay, PhonePe, Paytm)</p>
                        <p className="text-slate-500">Zero transaction surcharge</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-agri-600 hover:bg-agri-700 text-white font-black text-sm rounded-xl shadow-lg shadow-agri-600/30 transition flex items-center justify-center gap-2 mt-4"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm & Place Order (₹{grandTotal.toLocaleString('en-IN')})</span>
                </button>
              </form>
            ) : (
              /* CART ITEMS LIST */
              <div className="space-y-4">
                
                {/* Free Shipping Meter */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      {subtotal >= freeShippingThreshold ? 'Free Village Delivery Unlocked!' : `Add ₹${freeShippingThreshold - subtotal} more for Free Delivery`}
                    </span>
                    <span>{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
                  </div>
                  <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl bg-white shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {item.packSize}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-sm font-extrabold text-slate-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>

                          <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                            <button
                              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                              className="text-slate-500 hover:text-slate-800 font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-slate-800 w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                              className="text-slate-500 hover:text-slate-800 font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-slate-400 hover:text-rose-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Box */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon: KISAN50 or AGRI10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 p-2 text-xs uppercase font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-agri-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-[11px] text-emerald-600 font-bold mt-1">
                      Coupon applied! You saved ₹{couponDiscount}.
                    </p>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1">
                      {couponError}
                    </p>
                  )}
                </form>

              </div>
            )}
          </div>

          {/* Footer Breakdown & Action */}
          {!orderPlaced && cartItems.length > 0 && !isCheckingOut && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery to Village:</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount:</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-agri-700">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-agri-600 hover:bg-agri-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-agri-600/30 flex items-center justify-center gap-2 transition active:scale-98"
              >
                <span>Proceed to Village Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
