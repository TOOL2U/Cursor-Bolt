import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, MapPin, Loader2, ArrowLeft, Wallet, Building2, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const deliveryTimeSlots = [
    '09:00 - 11:00',
    '11:00 - 13:00',
    '13:00 - 15:00',
    '15:00 - 17:00',
    '17:00 - 19:00'
  ];

  const handleLocationFind = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        const addressInput = document.getElementById('address') as HTMLInputElement;
        if (addressInput) {
          addressInput.value = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        }
        
        setIsLocating(false);
      },
      (error) => {
        setLocationError("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] pl-10"
                  placeholder="1234 5678 9012 3456"
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] pl-10"
                    placeholder="MM/YY"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] pl-10"
                    placeholder="123"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'bank':
        return (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Bank Transfer Details</span>
            </div>
            <div className="space-y-2">
              <p><strong>Bank:</strong> Bangkok Bank</p>
              <p><strong>Account Name:</strong> Tool2U Co., Ltd.</p>
              <p><strong>Account Number:</strong> 731-0-146746</p>
            </div>
            <p className="text-sm text-gray-600">
              Please transfer the exact amount and send us the transfer slip through WhatsApp for faster verification.
            </p>
          </div>
        );
      case 'promptpay':
        return (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg text-center">
            <QrCode className="w-8 h-8 mx-auto text-gray-600" />
            <img 
              src="https://imgur.com/f6f79fe8-3977-4cbf-b1e9-4895ebf7e805" 
              alt="PromptPay QR Code"
              className="max-w-[200px] mx-auto"
            />
            <p className="text-sm text-gray-600">
              Scan this QR code with your banking app to pay via PromptPay
            </p>
          </div>
        );
      case 'cod':
        return (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Cash on Delivery</span>
            </div>
            <p className="text-sm text-gray-600">
              Pay in cash when your tools are delivered. Please prepare the exact amount.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <Link
            to="/basket"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1">
            {/* Delivery Information */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <input
                      id="address"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    />
                    <button
                      onClick={handleLocationFind}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFD700] text-gray-900 px-3 py-1 rounded-md text-sm font-medium hover:bg-[#FFE44D] transition-colors flex items-center gap-2"
                      disabled={isLocating}
                    >
                      {isLocating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Locating...</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4" />
                          <span>Find My Location</span>
                        </>
                      )}
                    </button>
                  </div>
                  {locationError && (
                    <p className="mt-1 text-sm text-red-600">{locationError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Delivery Time
                  </label>
                  <select
                    value={selectedDeliveryTime}
                    onChange={(e) => setSelectedDeliveryTime(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  >
                    <option value="">Select a time slot</option>
                    {deliveryTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Payment Method Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === 'card' ? 'border-[#FFD700] bg-[#FFD700]/10' : 'hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard className="w-6 h-6" />
                  <span>Credit Card</span>
                </button>
                <button
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === 'bank' ? 'border-[#FFD700] bg-[#FFD700]/10' : 'hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <Building2 className="w-6 h-6" />
                  <span>Bank Transfer</span>
                </button>
                <button
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === 'promptpay' ? 'border-[#FFD700] bg-[#FFD700]/10' : 'hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod('promptpay')}
                >
                  <QrCode className="w-6 h-6" />
                  <span>PromptPay</span>
                </button>
                <button
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    paymentMethod === 'cod' ? 'border-[#FFD700] bg-[#FFD700]/10' : 'hover:border-gray-400'
                  }`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <Wallet className="w-6 h-6" />
                  <span>Cash on Delivery</span>
                </button>
              </div>
              
              {/* Payment Method Form */}
              <div className="mt-6">
                {renderPaymentForm()}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-4">
                <div className="flex justify-between">
                  <span>Professional Drill Kit (3 days)</span>
                  <span>฿4,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Circular Saw (2 days)</span>
                  <span>฿2,300</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>฿500</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>฿7,300</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#FFD700] text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-[#FFE44D] transition-colors">
                Place Order
              </button>
              <Link
                to="/tools"
                className="w-full mt-4 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors block text-center"
              >
                Continue Shopping
              </Link>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}