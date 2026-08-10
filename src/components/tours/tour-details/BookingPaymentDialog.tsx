'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CreditCard, Plus, X, Loader2, DollarSign } from 'lucide-react';

interface BookingPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentMethodId?: string, paymentType?: string) => void;
  totalBdt: number;
  tourTitle?: string;
  tourLocation?: string;
}

interface PaymentMethodType {
  _id: string;
  label: string;
  card?: {
    brand?: string;
    last4?: string;
    expMonth?: number;
    expYear?: number;
  };
}

export default function BookingPaymentDialog({
  isOpen,
  onClose,
  onConfirm,
  totalBdt,
  tourTitle,
  tourLocation,
}: BookingPaymentDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMethodId, setSelectedMethodId] = useState<string>('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Mock exchange rate (1 USD = 120 BDT)
  const exchangeRate = 120;
  const totalUsd = (totalBdt / exchangeRate).toFixed(2);

  // New card form state
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      setStep(1);
      fetchPaymentMethods();
    }
  }, [isOpen]);

  const fetchPaymentMethods = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/traveler/payment-methods');
      if (res.ok) {
        const data = await res.json();
        setPaymentMethods(data);
        if (data.length > 0) {
          setSelectedMethodId(data[0]._id);
        } else {
          setIsAddingNew(true);
        }
      }
    } catch (err) {
      console.error('Failed to fetch payment methods', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/traveler/payment-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardNumber,
          expMonth,
          expYear,
          nameOnCard,
          methodType: 'card', // Mocking generic card
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add card');
      }

      setPaymentMethods([data, ...paymentMethods]);
      setSelectedMethodId(data._id);
      setIsAddingNew(false);
      // Reset form
      setCardNumber('');
      setExpMonth('');
      setExpYear('');
      setNameOnCard('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = () => {
    if (selectedMethodId) {
      onConfirm(selectedMethodId, 'card');
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[500px] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between px-[24px] pt-[24px] pb-[20px] border-b border-gray-100 shrink-0">
          <div>
            <h3 className="text-[28px] font-bold text-gray-900 leading-tight">
              {step === 1 ? 'Review Booking' : 'Payment Details'}
            </h3>
            <p className="text-gray-500 text-[14px] mt-1">
              {step === 1 ? 'Please review your booking details' : 'Complete your booking securely'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-[24px] py-[20px] space-y-[20px] overflow-y-auto custom-scrollbar">
          
          {/* Package Info */}
          {step === 1 && (
            <div className="space-y-[20px] animate-in fade-in slide-in-from-right-4 duration-300">
              {tourTitle && (
                <>
                  <div>
                    <h4 className="text-[18px] font-semibold text-gray-900">{tourTitle}</h4>
                    <p className="text-[13px] text-gray-500 mt-1">{tourLocation}</p>
                  </div>
                  <hr className="border-gray-100" />
                </>
              )}

              {/* Price Breakdown */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[14px] text-gray-500 mb-1">Total Amount</p>
                  <p className="text-[22px] font-semibold text-gray-900">৳ {totalBdt.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] text-gray-500 mb-1">USD Equivalent</p>
                  <p className="text-[22px] font-semibold text-blue-600">${totalUsd}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">
              {error}
            </div>
          )}

          {/* Payment Method */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h4 className="text-[14px] font-medium text-gray-500 mb-3">Payment Method</h4>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                <p className="text-sm text-gray-500">Loading payment methods...</p>
              </div>
            ) : (
              <>
                {!isAddingNew ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between hidden">
                      <h4 className="font-semibold text-gray-800">Saved Cards</h4>
                      <button 
                        onClick={() => setIsAddingNew(true)}
                        className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:text-blue-800"
                      >
                        <Plus className="w-4 h-4" /> Add New
                      </button>
                    </div>
                    
                    {paymentMethods.length === 0 ? (
                      <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-[14px] text-gray-500 mb-3">No saved cards found.</p>
                        <button 
                          onClick={() => setIsAddingNew(true)}
                          className="text-sm text-blue-600 font-medium inline-flex items-center gap-1 hover:text-blue-800"
                        >
                          <Plus className="w-4 h-4" /> Add a card
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <label 
                            key={method._id} 
                            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all bg-white ${selectedMethodId === method._id ? 'border-blue-500 ring-1 ring-blue-500 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                          >
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              className="mr-4 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                              checked={selectedMethodId === method._id}
                              onChange={() => setSelectedMethodId(method._id)}
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-[16px] text-gray-900">{method.label}</p>
                              <p className="text-[14px] text-gray-500 capitalize">{method.card?.brand} • Expires {method.card?.expMonth}/{method.card?.expYear}</p>
                            </div>
                            <div className="text-gray-400">
                              <CreditCard className="w-6 h-6" />
                            </div>
                          </label>
                        ))}
                        <div className="flex justify-end">
                          <button 
                            onClick={() => setIsAddingNew(true)}
                            className="text-[14px] text-blue-600 font-medium flex items-center gap-1 hover:text-blue-800"
                          >
                            <Plus className="w-4 h-4" /> Add another card
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">Add New Card</h4>
                    {paymentMethods.length > 0 && (
                      <button 
                        onClick={() => setIsAddingNew(false)}
                        className="text-sm text-gray-500 font-medium hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleAddNewCard} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name on Card</label>
                      <input 
                        type="text" 
                        required
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
                      <input 
                        type="text" 
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="0000 0000 0000 0000"
                        maxLength={16}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Month</label>
                        <input 
                          type="text" 
                          required
                          value={expMonth}
                          onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="MM"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Year</label>
                        <input 
                          type="text" 
                          required
                          value={expYear}
                          onChange={(e) => setExpYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          placeholder="YYYY"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || cardNumber.length < 15 || !expMonth || !expYear}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 h-[50px]"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                      ) : (
                        'Save Card'
                      )}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>


        {/* Footer */}
        <div className="px-[24px] pb-[24px] pt-[20px] border-t border-gray-100 shrink-0 bg-white">
          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              className="w-full h-[48px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-[15px] font-semibold rounded-xl transition-all shadow-md"
            >
              Proceed to Payment
            </button>
          ) : (
            !loading && !isAddingNew && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 h-[48px] bg-gray-100 hover:bg-gray-200 text-gray-700 text-[15px] font-semibold rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!selectedMethodId}
                  className="flex-1 h-[48px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-[15px] font-semibold rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
