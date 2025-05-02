import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colorTheme } from "../components/ColorTheme";
const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [payingIndex, setPayingIndex] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
    
    // Add animation delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  const cancelAppointment = (index) => {
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    toast.success("Appointment canceled");
  };

  const completePayment = () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const updated = appointments.map((appt, i) =>
      i === payingIndex ? { ...appt, paid: true, method: selectedMethod } : appt
    );

    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    toast.success(`Paid via ${selectedMethod}`);
    setPayingIndex(null);
    setSelectedMethod("");
  };

  const startPayment = (index) => {
    setPayingIndex(index);
    setSelectedMethod("");
  };

  const cancelPayment = () => {
    setPayingIndex(null);
    setSelectedMethod("");
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a date and a time.");
      return;
    }

    // This function needs docInfo which isn't defined in this component
    // In a real implementation, you'd need to pass the doctor info
    const newBooking = {
      doctorId: "sample-id",
      doctorName: "Dr. Sample",
      speciality: "General Practitioner",
      image: "/api/placeholder/200/200",
      experience: "5 years",
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
    };

    const existing = JSON.parse(localStorage.getItem("appointments") || "[]");
    localStorage.setItem("appointments", JSON.stringify([...existing, newBooking]));

    setBookingConfirmed(true);
    toast.success("Appointment booked successfully!");
  };

  const paymentOptions = ["E-wallet", "Credit Card", "Insurance Company", "Bank Transfer"];
  
  const filteredAppointments = appointments.filter(appt => {
    if (filterStatus === "paid") return appt.paid;
    if (filterStatus === "unpaid") return !appt.paid;
    return true; // "all"
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r ${colorTheme.primary.light} opacity-5 blur-3xl animate-pulse`} style={{animationDuration: '15s'}}></div>
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r ${colorTheme.secondary.light} opacity-5 blur-3xl animate-pulse`} style={{animationDuration: '20s', animationDelay: '2s'}}></div>
      </div>
      
      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorTheme.primary.gradient}`}>
            My Appointments
          </h1>
          
          {/* Filter tabs */}
          <div className="flex bg-white shadow-sm rounded-full p-1">
            {['all', 'upcoming', 'paid', 'unpaid'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  filterStatus === status 
                    ? `bg-gradient-to-r ${colorTheme.primary.gradient} text-white shadow-sm` 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Date Picker */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Find Appointments by Date</h2>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative group w-full md:w-auto flex-grow">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                placeholderText="Choose a date"
                aria-label="Select appointment date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 bg-gray-50"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <button
              onClick={() => {/* Filter by date logic */}}
              className={`bg-gradient-to-r ${colorTheme.primary.gradient} text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] flex items-center`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Appointments
            </button>
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No appointments found</h3>
            <p className="text-gray-500 mb-6">You don't have any {filterStatus !== 'all' ? filterStatus : ''} appointments yet.</p>
            <button
              onClick={() => navigate("/doctors")}
              className={`bg-gradient-to-r ${colorTheme.secondary.gradient} text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]`}
            >
              Book an Appointment
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredAppointments.map((appt, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-lg ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Left Side - Image */}
                  <div className="sm:w-1/4 relative">
                    <img
                      src={appt.image}
                      alt={appt.doctorName}
                      className="w-full h-40 sm:h-full object-cover"
                    />
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      appt.paid 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {appt.paid ? 'Paid' : 'Unpaid'}
                    </div>
                  </div>
                  
                  {/* Right Side - Info & Actions */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{appt.doctorName}</h3>
                        <p className={`text-sm ${colorTheme.primary.text}`}>{appt.speciality}</p>
                      </div>
                      
                      <div className={`inline-flex items-center mt-2 md:mt-0 px-3 py-1 rounded-full text-sm bg-gray-100 ${
                        appt.paid 
                          ? colorTheme.primary.text
                          : colorTheme.secondary.text
                      }`}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {appt.paid ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          )}
                        </svg>
                        {appt.paid ? `Paid via ${appt.method}` : 'Payment required'}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorTheme.primary.light}`}>
                          <svg className={`w-5 h-5 ${colorTheme.primary.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-xs text-gray-500">Appointment Date</p>
                          <p className="font-medium">{appt.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorTheme.secondary.light}`}>
                          <svg className={`w-5 h-5 ${colorTheme.secondary.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-xs text-gray-500">Appointment Time</p>
                          <p className="font-medium">{appt.time}</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Modal */}
                    {payingIndex === index && !appt.paid && (
                      <div className="mt-4 bg-gray-50 border border-gray-100 p-4 rounded-lg animate-fadeIn">
                        <p className="font-medium text-gray-700 mb-3">Select Payment Method:</p>
                        <div className="flex flex-wrap gap-2">
                          {paymentOptions.map((method) => (
                            <button
                              key={method}
                              onClick={() => setSelectedMethod(method)}
                              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                                selectedMethod === method
                                  ? `bg-gradient-to-r ${colorTheme.primary.gradient} text-white`
                                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              {method}
                            </button>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={completePayment}
                            className={`px-4 py-2 rounded-lg bg-gradient-to-r ${colorTheme.primary.gradient} text-white hover:shadow-md transition-all duration-300`}
                          >
                            Confirm Payment
                          </button>
                          <button
                            onClick={cancelPayment}
                            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {!appt.paid && payingIndex !== index && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          onClick={() => startPayment(index)}
                          className={`px-5 py-2 rounded-lg bg-gradient-to-r ${colorTheme.primary.gradient} text-white text-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-2px] flex items-center`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          Pay Online
                        </button>
                        <button
                          onClick={() => cancelAppointment(index)}
                          className="px-5 py-2 rounded-lg bg-red-100 text-red-600 text-sm hover:bg-red-200 transition-all duration-300 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Toast Styling */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
            padding: "1rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
};

export default MyAppointments;