import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [payingIndex, setPayingIndex] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [docInfo, setDocInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
    setLoading(false);
  }, [doctors, docId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading doctor profile...
      </div>
    );
  }

  if (!docInfo && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Doctor not found.
      </div>
    );
  }

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

    const newBooking = {
      doctorId: docInfo._id,
      doctorName: docInfo.name,
      speciality: docInfo.speciality,
      image: docInfo.image,
      experience: docInfo.experience,
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
    };

    const existing = JSON.parse(localStorage.getItem("appointments") || "[]");
    localStorage.setItem("appointments", JSON.stringify([...existing, newBooking]));

    setBookingConfirmed(true);
    toast.success("Appointment booked successfully!");
  };

  const paymentOptions = ["E-wallet", "Credit Card", "Insurance Company", "Bank Transfer"];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 mb-6">My Appointments</h1>

        <div className="mb-6">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            placeholderText="Choose a date"
            aria-label="Select appointment date"
            className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-500">You have no appointments yet.</p>
        ) : (
          <div className="grid gap-6">
            {appointments.map((appt, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={appt.image}
                  alt={appt.doctorName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{appt.doctorName}</h3>
                  <p className="text-sm text-gray-500">{appt.speciality}</p>
                  <p className="text-sm text-gray-500">Experience: {appt.experience}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium text-emerald-600">Date:</span> {appt.date} |{" "}
                    <span className="font-medium text-emerald-600">Time:</span> {appt.time}
                  </p>

                  <p className="text-sm mt-1">
                    <span className="font-medium text-gray-700">Payment Status:</span>{" "}
                    {appt.paid ? (
                      <span className="text-green-600 font-semibold">
                        Paid ✅ ({appt.method})
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">Unpaid ❌</span>
                    )}
                  </p>

                  {/* Payment Modal Section */}
                  {payingIndex === index && !appt.paid && (
                    <div className="mt-4 bg-gray-50 border p-3 rounded-md shadow-sm">
                      <p className="mb-2 font-medium text-gray-700">Select Payment Method:</p>
                      <div className="flex flex-wrap gap-3">
                        {paymentOptions.map((method) => (
                          <button
                            key={method}
                            onClick={() => setSelectedMethod(method)}
                            className={`px-4 py-2 rounded-full border text-sm ${
                              selectedMethod === method
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={completePayment}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                        >
                          Confirm Payment
                        </button>
                        <button
                          onClick={cancelPayment}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {!appt.paid && payingIndex !== index && (
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => startPayment(index)}
                        className="px-4 py-1 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
                      >
                        Pay Online
                      </button>
                      <button
                        onClick={() => cancelAppointment(index)}
                        className="px-4 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Default options for all toasts
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
    </div>
  );
};

export default MyAppointments;
