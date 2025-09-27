import React, { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Helper function to format currency as Indian Rupees (₹)
const formatINR = (amount) => {
  // Assuming the numerical values are base units (e.g., 199 is ₹199)
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const Payment = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  // New state to hold the numeric discount rate (0.1 for 10%)
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  // Course data, price is now the base amount in INR
  const course = {
    thumbnail:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400",
    title: "Advanced React Development",
    instructor: "Sarah Johnson",
    duration: "12 weeks",
    price: 19900, // Price set to a higher value to represent INR accurately
    rating: 4.8,
  };

  const recommendedCourses = [
    {
      id: 1,
      title: "React Hooks Masterclass",
      instructor: "Mike Chen",
      price: 9900,
    },
    {
      id: 2,
      title: "Next.js for Production",
      instructor: "Emma Davis",
      price: 14900,
    },
  ];

  // Calculate payment summary dynamically using useMemo
  const paymentSummary = useMemo(() => {
    const subtotal = course.price;
    const taxRate = 0.1; // 10% Tax
    const tax = subtotal * taxRate;

    // Calculate discount based on the applied percentage
    const discountAmount = subtotal * discountPercentage;
    const finalTotal = subtotal + tax - discountAmount;

    return {
      subtotal: subtotal,
      tax: tax,
      // Ensure discount is non-negative
      discount: Math.max(0, discountAmount),
      total: Math.max(0, finalTotal),
      // For display purposes in the summary section
      discountDisplay: discountPercentage * 100,
    };
  }, [course.price, discountPercentage]);

  const handleInputChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  // Logic to handle promo code application and set discount percentage
  const applyPromoCode = useCallback(() => {
    const code = promoCode.toLowerCase().trim();
    let percentage = 0;

    if (code === "edu10") {
      percentage = 0.1;
      toast.success(
        "Promo code EDU10 applied! You received 10% off the subtotal."
      );
    } else if (code === "edu20") {
      percentage = 0.2;
      toast.success(
        "Promo code EDU20 applied! You received 20% off the subtotal."
      );
    } else if (code === "") {
      percentage = 0;
      toast.error("Please enter a valid promo code.");
    } else {
      percentage = 0;
      toast.error(`Invalid promo code: "${promoCode}". No discount applied.`);
    }

    setDiscountPercentage(percentage);
  }, [promoCode]);

  const handlePayment = () => {
    // Basic validation before proceeding to payment confirmation
    const requiredFields = ["name", "email", "phone", "address"];
    const isValid = requiredFields.every(
      (field) => billingInfo[field].trim() !== ""
    );

    if (!isValid) {
      toast.error("Please fill in all required billing information.");
      return;
    }

    setActiveStep(3);
  };

  const handleRecommendedCourseClick = () => {
    navigate("/courses");
  };

  useEffect(() => {
    if (activeStep === 3) {
      // Automatically navigate after successful payment confirmation
      const timer = setTimeout(() => {
        navigate("/courses");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeStep, navigate]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Secure Checkout
        </h1>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-2">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    activeStep >= step
                      ? "bg-blue-600 text-white shadow-lg ring-4 ring-blue-200"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-28 h-1 mx-2 rounded-full transition-all duration-300 ${
                      activeStep > step ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 px-10 max-w-lg mx-auto">
            <span
              className={activeStep >= 1 ? "text-blue-600 font-semibold" : ""}
            >
              Billing Info
            </span>
            <span
              className={activeStep >= 2 ? "text-blue-600 font-semibold" : ""}
            >
              Payment
            </span>
            <span
              className={activeStep >= 3 ? "text-blue-600 font-semibold" : ""}
            >
              Confirmation
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Steps) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Details (Visible always) */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your Enrollment
              </h2>
              <div className="flex items-center space-x-6">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/96x96/4F46E5/ffffff?text=Course";
                  }}
                  className="w-24 h-24 rounded-xl object-cover shadow-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-xl">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 mt-1 text-sm">
                    Instructor: {course.instructor}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-blue-500 font-medium">
                      {course.duration}
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatINR(course.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Billing Info */}
            {activeStep === 1 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Billing Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["name", "email", "phone", "address", "city", "zipCode"].map(
                    (field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {field === "name"
                            ? "Full Name"
                            : field.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={billingInfo[field]}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                          placeholder={`Enter your ${field
                            .replace(/([A-Z])/g, " $1")
                            .toLowerCase()}`}
                        />
                      </div>
                    )
                  )}
                </div>
                <button
                  onClick={() => handlePayment()}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 mt-8 shadow-lg transform hover:scale-[1.01]"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {activeStep === 2 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Payment Method
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {["card", "upi", "wallet", "netbanking"].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 border-2 rounded-xl text-center transition duration-200 font-medium capitalize text-sm shadow-sm ${
                        paymentMethod === method
                          ? "border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-300"
                          : "border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-gray-50"
                      }`}
                    >
                      {method
                        .replace("netbanking", "Net Banking")
                        .toUpperCase()}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <input
                      type="text"
                      placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-inner"
                      maxLength="19"
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="col-span-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-inner"
                        maxLength="5"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-inner"
                        maxLength="4"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center space-x-6 mt-8 pt-6 border-t border-gray-200 text-gray-500">
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    100% Secure
                  </span>
                  <div className="flex gap-2 text-3xl">
                    <span title="Visa">💳</span>
                    <span title="Mastercard">💳</span>
                    <span title="UPI">UPI</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-200 mt-6 shadow-lg transform hover:scale-[1.01]"
                >
                  Pay {formatINR(paymentSummary.total)} Now
                </button>
                <button
                  onClick={() => setActiveStep(1)}
                  className="w-full text-blue-600 bg-transparent py-2 rounded-xl font-medium mt-3 hover:text-blue-700 transition"
                >
                  &larr; Back to Billing Info
                </button>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {activeStep === 3 && (
              <div className="bg-white rounded-2xl shadow-xl p-10 text-center space-y-6 border border-gray-100">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Payment Successful! 🎉
                </h2>
                <p className="text-gray-600 text-lg">
                  Thank you for your purchase. A confirmation email has been
                  sent to your inbox.
                </p>
                <p className="text-md text-blue-600 font-medium">
                  You are now being redirected to the courses page...
                </p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4 text-xl border-b pb-3">
                Order Summary
              </h3>
              <div className="space-y-3 text-gray-600 text-md">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatINR(paymentSummary.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>{formatINR(paymentSummary.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount ({paymentSummary.discountDisplay}%)</span>
                  <span className="text-red-600 font-semibold">
                    - {formatINR(paymentSummary.discount)}
                  </span>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between font-bold text-2xl text-gray-900">
                  <span>Total Due</span>
                  <span className="text-green-600">
                    {formatINR(paymentSummary.total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (e.g., EDU10)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={activeStep === 3}
                    className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-xl hover:bg-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Recommended Courses (You Might Also Like) */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 text-xl">
                You Might Also Like
              </h3>
              <div className="space-y-4">
                {recommendedCourses.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={handleRecommendedCourseClick}
                    className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition transform hover:scale-[1.01] duration-150 border border-gray-200"
                  >
                    <div className="w-16 h-16 bg-blue-200 rounded-xl flex items-center justify-center text-blue-700 text-lg font-bold">
                      {rec.title
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {rec.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {rec.instructor}
                      </p>
                      <p className="text-sm font-bold text-blue-500 mt-1">
                        {formatINR(rec.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
