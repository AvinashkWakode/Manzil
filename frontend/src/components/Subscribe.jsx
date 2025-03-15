import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const navigate = useNavigate();

  const openForm = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPlan("");
  };

  const handleSubscription = (e) => {
    e.preventDefault();
    navigate("/payment", { state: { selectedPlan } });
  };

  return (
    <div className="px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold text-center">Our Membership</h2>
      <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-3">
        {/* Weekly Plan */}
        <div className="p-6 text-center bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">MANZIL Premium <span className="font-bold">Weekly</span></h3>
          <p className="mt-2 text-2xl font-bold">₹ 99 /-</p>
          <p className="text-gray-600">Weekly Subscription</p>
          <p className="mt-2 text-gray-500">7-day FREE TRIAL</p>
          <button 
            onClick={() => openForm("Weekly - ₹ 99 /-")}
            className="px-6 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Subscribe
          </button>
        </div>
        
        {/* Monthly Plan */}
        <div className="relative p-6 text-center bg-white border-2 border-blue-700 rounded-lg shadow-lg">
          <span className="absolute px-3 py-1 text-xs font-bold text-white uppercase transform -translate-x-1/2 bg-blue-700 rounded-full -top-4 left-1/2">
            Most Popular
          </span>
          <h3 className="text-xl font-semibold">MANZIL Premium <span className="font-bold">Monthly</span></h3>
          <p className="mt-2 text-2xl font-bold">₹ 249 /-</p>
          <p className="text-gray-600">Monthly Subscription</p>
          <p className="mt-2 text-gray-500">14-day FREE TRIAL</p>
          <button 
            onClick={() => openForm("Monthly - ₹ 249 /-")}
            className="px-6 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Subscribe 
          </button>
        </div>
        
        {/* Annual Plan */}
        <div className="relative p-6 text-center bg-white border-2 border-blue-700 rounded-lg shadow-lg">
          <span className="absolute px-3 py-1 text-xs font-bold text-white uppercase transform -translate-x-1/2 bg-blue-700 rounded-full -top-4 left-1/2">
            Best Deal
          </span>
          <h3 className="text-xl font-semibold">MANZIL <span className="font-bold">Annual</span></h3>
          <p className="mt-2 text-2xl font-bold">₹ 2,499 /-</p>
          <p className="text-gray-600">Annual Subscription</p>
          <p className="mt-2 text-gray-500">30-day FREE TRIAL</p>
          <button 
            onClick={() => openForm("Annual - ₹ 2,499 /-")}
            className="px-6 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Subscribe 
          </button>
        </div>
      </div>

      {/* Subscription Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-center">Subscribe Now</h2>
            <p className="mb-4 text-center text-gray-600">Plan: <span className="font-semibold">{selectedPlan}</span></p>
            <form onSubmit={handleSubscription} className="space-y-4">
              <div>
                <label className="block font-medium">Full Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter your full name" 
                  required 
                />
              </div>

              <div>
                <label className="block font-medium">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter your email" 
                  required 
                />
              </div>

              <div>
                <label className="block font-medium">Mobile Number</label>
                <input 
                  type="tel" 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter your mobile number" 
                  pattern="[0-9]{10}" 
                  maxLength="10"
                  required 
                />
              </div>

              <div className="flex justify-between">
                <button 
                  type="button" 
                  onClick={closeForm}
                  className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Confirm Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
