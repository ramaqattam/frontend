import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "03:00 PM", "05:30 PM"];

  useEffect(() => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  }, [doctors, docId]);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and a time.");
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
  };

  if (!docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading doctor profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Doctor Image */}
        <img
          src={docInfo.image}
          alt={docInfo.name}
          className="w-full md:w-1/3 h-64 object-cover rounded-lg"
        />

        {/* Doctor Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-emerald-600 mb-2">
            {docInfo.name}
          </h2>
          <p className="text-sm text-gray-500 mb-1">{docInfo.speciality}</p>
          <p className="text-sm text-gray-600 mb-4">{docInfo.experience}</p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Schedule your appointment with {docInfo.name} by selecting a preferred date and time below.
          </p>

          {/* Booking Form */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Select Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                placeholderText="Choose a date"
                className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Select Time:</label>
              <div className="flex flex-wrap gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedTime === time
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="mt-4 bg-emerald-600 text-white font-medium px-6 py-2 rounded-full hover:bg-emerald-700 transition"
            >
              Book Appointment
            </button>

            {bookingConfirmed && (
              <div className="mt-4 text-green-600 font-medium">
                ✅ Appointment booked for {selectedDate?.toLocaleDateString()} at {selectedTime}.
              </div>
            )}
          </div>

          <p
            onClick={() => navigate("/doctors")}
            className="mt-6 text-sm text-emerald-500 hover:underline cursor-pointer"
          >
            ← Back to all doctors
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
