import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Tag, Check, CreditCard, Wallet, AlertCircle, X } from 'lucide-react';
import Navbar from '../../layouts/Navbar';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import CheckoutStepper from '../../components/checkout/CheckoutStepper';
import { createBooking, validateCoupon, payBooking } from '../../services/bookingService';
import { clearSelection } from '../../store/checkoutSlice';

const SERVICE_FEE_RATE = 0.08;

const ADD_ONS = [
  { id: 'drinks', icon: '🍹', title: 'Premium Drinks Package',    description: 'Unlimited premium cocktails & soft drinks', pricePerPerson: 35 },
  { id: 'merch',  icon: '👕', title: 'Exclusive Event Merchandise', description: 'T-shirt, cap & exclusive keepsake',          pricePerPerson: 25 },
];

const PAYMENT_METHODS = [
  { id: 'card',   label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'paypal', label: 'PayPal',               icon: Wallet     },
];

export default function BookingCheckout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const dispatch  = useDispatch();

  const selectedSeats     = useSelector((s) => s.checkout.selectedSeats);
  const eventId           = useSelector((s) => s.checkout.eventId);
  const event             = location.state?.event ?? null;

  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [paymentMethod,  setPaymentMethod]  = useState('card');
  const [couponCode,     setCouponCode]     = useState('');
  const [appliedCoupon,  setAppliedCoupon]  = useState(null); // { discountAmount, finalPrice, discount, couponCode }
  const [couponLoading,  setCouponLoading]  = useState(false);
  const [couponError,    setCouponError]    = useState('');
  const [submitting,     setSubmitting]     = useState(false);
  const [errorMsg,       setErrorMsg]       = useState('');

  // ── Price calculations ────────────────────────────────────────
  const ticketCount = selectedSeats.length;
  const subtotal    = selectedSeats.reduce((s, seat) => s + seat.price, 0);
  const addOnTotal  = selectedAddOns.reduce((s, id) => {
    const a = ADD_ONS.find((a) => a.id === id);
    return s + (a ? a.pricePerPerson * ticketCount : 0);
  }, 0);
  const serviceFee  = (subtotal + addOnTotal) * SERVICE_FEE_RATE;
  const beforeCoupon = subtotal + addOnTotal + serviceFee;

  // Use discountAmount from API response when coupon applied
  const discount = appliedCoupon?.discountAmount ?? 0;
  const total    = appliedCoupon?.finalPrice != null
    ? appliedCoupon.finalPrice + addOnTotal + serviceFee  // API gives finalPrice for ticket portion
    : beforeCoupon - discount;

  // ── Handlers ──────────────────────────────────────────────────
  function toggleAddOn(id) {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
    // Reset coupon when add-ons change (price changed)
    if (appliedCoupon) { setAppliedCoupon(null); setCouponCode(''); }
  }

  async function handleApplyCoupon() {
    if (!couponCode.trim() || !eventId) return;
    setCouponLoading(true);
    setCouponError('');
    setAppliedCoupon(null);
    try {
      // POST /api/coupons/validate  { code, eventId, totalPrice }
      const result = await validateCoupon({
        code:       couponCode.trim(),
        eventId,
        totalPrice: Math.round(beforeCoupon * 100) / 100,
      });
      setAppliedCoupon(result);
    } catch (err) {
      setCouponError(err.message || 'Invalid or expired coupon code');
    } finally {
      setCouponLoading(false);
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  }

  async function handlePay() {
    setSubmitting(true);
    setErrorMsg('');
    try {
      // Step 1: group seats into tickets array
      const ticketMap = {};
      for (const seat of selectedSeats) {
        if (!ticketMap[seat.type]) {
          ticketMap[seat.type] = { ticketType: seat.type, quantity: 0, price: seat.price, subtotal: 0 };
        }
        ticketMap[seat.type].quantity += 1;
        ticketMap[seat.type].subtotal += seat.price;
      }

      // Step 2: POST /api/bookings → get bookingId
      const booking = await createBooking({
        eventId,
        tickets:       Object.values(ticketMap),
        totalPrice:    Math.round(total * 100) / 100,
        paymentMethod,
        ...(appliedCoupon ? { couponCode: couponCode.toUpperCase() } : {}),
      });

      // Step 3: POST /api/payment/pay → { bookingId, paymentMethod }
      await payBooking({ bookingId: booking._id, paymentMethod });

      // Step 4: clear Redux + navigate to confirmed
      dispatch(clearSelection());
      navigate(`/confirmed-booking/${eventId}`, {
      state: { booking, event },
      replace: true,
    });
    } catch (err) {
      setErrorMsg(err.message || 'Payment failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  // Guard
  if (selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F7FF]">
        <Navbar />
        <Container className="py-20 text-center">
          <p className="text-2xl font-bold text-slate-800">No seats selected</p>
          <p className="mt-2 text-slate-500">Please go back and select your seats first.</p>
          <Button className="mt-6" onClick={() => navigate(-1)}>Go Back</Button>
        </Container>
      </div>
    );
  }

  // Build a clean seat label list
  const seatLabels = selectedSeats
    .map((s) => `${s.row} Seat ${s.number}`)
    .join(' · ');
  const ticketTypeSummary = (() => {
    const counts = {};
    for (const s of selectedSeats) counts[s.type] = (counts[s.type] ?? 0) + 1;
    return Object.entries(counts)
      .map(([t, q]) => `${t === 'vip' ? 'VIP' : 'General Admission'} x${q}`)
      .join(', ');
  })();

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <Navbar />

      <div className="bg-white border-b border-slate-100">
        <Container className="flex items-center justify-between py-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Checkout{event?.title ? <span className="text-slate-400 font-normal"> — {event.title}</span> : ''}
          </h1>
          <CheckoutStepper currentStep={2} />
        </Container>
      </div>

      {/* Error toast */}
      {errorMsg && (
        <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-red-600 px-5 py-3.5 text-sm font-medium text-white shadow-xl">
          <AlertCircle size={16} />
          {errorMsg}
          <button onClick={() => setErrorMsg('')} className="ml-2 cursor-pointer"><X size={16} /></button>
        </div>
      )}

      <Container className="py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-6">

            {/* Order Summary */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-slate-900">Order Summary</h2>
              <div className="flex items-start gap-4">
                {event?.images?.[0] && (
                  <img src={event.images[0]} alt={event.title}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">
                    {event?.title ?? 'Your Event'}
                  </p>
                  {event?.date && (
                    <p className="mt-0.5 text-sm text-slate-400">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                      {event.location ? ` · ${event.location}` : ''}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    {seatLabels} · {ticketTypeSummary}
                  </p>
                </div>
              </div>
            </section>

            {/* Add-ons */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="font-bold text-slate-900">Enhance Your Experience</h2>
              <p className="mt-1 mb-4 text-sm text-slate-400">Add extras to make your event unforgettable</p>
              <div className="flex flex-col gap-3">
                {ADD_ONS.map((addon) => {
                  const active = selectedAddOns.includes(addon.id);
                  return (
                    <button key={addon.id} type="button" onClick={() => toggleAddOn(addon.id)}
                      className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                        active ? 'border-violet-300 bg-violet-50' : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}>
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl ${active ? 'bg-violet-600' : 'bg-slate-100'}`}>
                        {addon.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800">{addon.title}</p>
                        <p className="text-sm text-slate-400">{addon.description}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-semibold text-violet-600">+${addon.pricePerPerson}/person</span>
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${active ? 'border-violet-600 bg-violet-600' : 'border-slate-300'}`}>
                          {active && <Check size={13} className="text-white" strokeWidth={3} />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Coupon */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-slate-900">Apply Coupon Code</h2>
              <div className="flex gap-3">
                <input
                  value={couponCode}
                  onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                  placeholder="Enter coupon code"
                  disabled={!!appliedCoupon}
                  className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100 disabled:opacity-50"
                />
                <Button onClick={handleApplyCoupon} disabled={couponLoading || !!appliedCoupon || !couponCode.trim()} className="shrink-0 px-6">
                  {couponLoading ? 'Checking...' : 'Apply'}
                </Button>
              </div>

              {couponError && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
                  <AlertCircle size={14} /> {couponError}
                </p>
              )}

              {appliedCoupon && (
                <div className="mt-3 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-2.5">
                  <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                    <Tag size={14} />
                    {appliedCoupon.couponCode} applied — You save ${appliedCoupon.discountAmount?.toFixed(2)}!
                  </div>
                  <button onClick={removeCoupon} className="text-green-600 hover:text-green-800 cursor-pointer">
                    <X size={16} />
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex flex-col gap-6">

            {/* Price Summary */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-slate-900">Price Summary</h2>
              <div className="flex flex-col gap-3 text-sm">
                {Object.entries(
                  selectedSeats.reduce((acc, s) => {
                    acc[s.type] = { count: (acc[s.type]?.count ?? 0) + 1, price: s.price };
                    return acc;
                  }, {})
                ).map(([type, { count, price }]) => (
                  <div key={type} className="flex justify-between text-slate-600">
                    <span>{count}x {type === 'vip' ? 'VIP' : 'GA'} Tickets</span>
                    <span>${(price * count).toFixed(2)}</span>
                  </div>
                ))}

                {selectedAddOns.map((id) => {
                  const a = ADD_ONS.find((a) => a.id === id);
                  if (!a) return null;
                  return (
                    <div key={id} className="flex justify-between text-slate-600">
                      <span>{a.title} (x{ticketCount})</span>
                      <span>${(a.pricePerPerson * ticketCount).toFixed(2)}</span>
                    </div>
                  );
                })}

                <div className="flex justify-between text-slate-600">
                  <span>Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between font-medium text-emerald-600">
                    <span>Discount ({appliedCoupon.couponCode})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="mt-2 flex justify-between border-t border-slate-100 pt-3 font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-lg text-violet-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-slate-900">Payment Method</h2>
              <div className="flex flex-col gap-3">
                {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                  <button key={id} type="button" onClick={() => setPaymentMethod(id)}
                    className={`flex items-center justify-between rounded-2xl border p-4 transition-all cursor-pointer ${
                      paymentMethod === id ? 'border-violet-400 bg-violet-50' : 'border-slate-200 hover:border-slate-300'
                    }`}>
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={paymentMethod === id ? 'text-violet-600' : 'text-slate-400'} />
                      <span className={`text-sm font-medium ${paymentMethod === id ? 'text-violet-700' : 'text-slate-700'}`}>{label}</span>
                    </div>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === id ? 'border-violet-600' : 'border-slate-300'}`}>
                      {paymentMethod === id && <div className="h-2.5 w-2.5 rounded-full bg-violet-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Pay */}
            <div>
              <button type="button" onClick={handlePay} disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 py-4 text-base font-bold text-white shadow-md transition hover:opacity-90 disabled:opacity-60 cursor-pointer">
                <Lock size={16} />
                {submitting ? 'Processing...' : `Pay $${total.toFixed(2)} Securely`}
              </button>
              <p className="mt-3 text-center text-xs text-slate-400">
                256-bit SSL encrypted · PCI compliant · Instant ticket delivery
              </p>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}