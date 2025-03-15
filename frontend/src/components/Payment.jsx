import { useState } from "react";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-white">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg flex">
        <div className="w-2/3 pr-6">
          <h2 className="mb-4 text-2xl font-bold text-center">Place Order</h2>

          <div>
            <p className="mb-2 font-semibold">Choose your payment method</p>
            <div className="flex mb-4 space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                <span>Card</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="payment" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
                <span>UPI</span>
              </label>
            </div>
          </div>

          {paymentMethod === "card" && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Name on Card" className="w-full p-2 border rounded col-span-2" pattern="^[A-Za-z ]+$" title="Only letters and spaces allowed" />
              <input type="text" placeholder="Card Number" className="w-full p-2 border rounded col-span-2" maxLength="16" pattern="\d{16}" title="Enter a valid 16-digit card number" />
              <input type="text" placeholder="EXP (MM/YY)" className="w-full p-2 border rounded" maxLength="5" pattern="(0[1-9]|1[0-2])/(\d{2})" title="Enter a valid expiration date (MM/YY)" />
              <input type="text" placeholder="CVV" className="w-full p-2 border rounded" maxLength="3" pattern="\d{3}" title="Enter a valid 3-digit CVV" />
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="mb-4 text-center">
              <img src="/qr-code.png" alt="QR Code" className="mx-auto h-32 w-32" />
              <p className="mt-2">Scan the QR code or enter your UPI ID below:</p>
              <input type="text" placeholder="Enter UPI ID" className="w-full p-2 border rounded" />
            </div>
          )}
          
          <button className="w-full px-6 py-2 mt-4 text-white bg-green-600 rounded">Make Payment</button>
        </div>
        
        <div className="w-1/3 p-4 bg-gray-100 rounded-lg">
          <h3 className="mb-2 font-bold">Order Summary</h3>
          <div className="space-y-2">
            <p className="flex justify-between"><span>Subscription Type</span><span>Premium Access</span></p>
            <p className="flex justify-between"><span>Price</span><span>₹3,999.00</span></p>
            <p className="flex justify-between"><span>Tax</span><span>₹199.00</span></p>
            <p className="flex justify-between text-lg font-bold"><span>Total</span><span>₹4,198.00</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
