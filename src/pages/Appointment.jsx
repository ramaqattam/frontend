import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colorTheme } from "../components/ColorTheme";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("appointment");

  const timeSlots = [
    { time: "09:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "12:00 PM", available: false },
    { time: "03:00 PM", available: true },
    { time: "05:30 PM", available: true }
  ];

  // Simulated doctor data
  useEffect(() => {
    // This would come from AppContext in a real implementation
    const mockDoctor = {
      _id: docId || "doc-sample",
      name: "Dr. Emily Chen",
      speciality: "Cardiologist",
      image: "/api/placeholder/400/400",
      experience: "10+ years of experience",
      rating: 4.9,
      reviews: 120,
      education: "Harvard Medical School",
      languages: ["English", "Mandarin"],
      about: "Dr. Chen is a board-certified cardiologist specializing in preventive cardiology and heart disease management. She has extensive experience in treating complex cardiovascular conditions and is committed to providing patient-centered care."
    };
    
    setDocInfo(mockDoctor);
    
    // Add animation delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, [docId]);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${colorTheme.primary.gradient} opacity-50 mb-4`}></div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r ${colorTheme.primary.light} opacity-5 blur-3xl animate-pulse`} style={{animationDuration: '15s'}}></div>
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r ${colorTheme.secondary.light} opacity-5 blur-3xl animate-pulse`} style={{animationDuration: '20s', animationDelay: '2s'}}></div>
      </div>
      
      <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Back Button */}
        <button
          onClick={() => navigate("/doctors")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all doctors
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left column - Doctor Profile */}
            <div className="lg:col-span-1 relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
              <div className="absolute inset-0 opacity-20">
                <div className={`absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r ${colorTheme.primary.gradient} blur-2xl`}></div>
                <div className={`absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r ${colorTheme.secondary.gradient} blur-2xl`}></div>
              </div>
              
              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="text-center">
                  <div className="inline-block rounded-full p-1 bg-white bg-opacity-10 mb-4">
                    <img
                      src={docInfo.image}
                      alt={docInfo.name}
                      className="w-32 h-32 object-cover rounded-full border-2 border-white border-opacity-20"
                    />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-1">
                    {docInfo.name}
                  </h2>
                  <p className="text-sm text-gray-300 mb-2">{docInfo.speciality}</p>
                  
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(docInfo.rating) ? 'text-yellow-400' : 'text-gray-500'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm">{docInfo.rating} ({docInfo.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="mt-4 flex-grow">
                  <div className="border-t border-white border-opacity-10 pt-4 pb-2">
                    <h3 className="font-medium mb-2 text-lg">About</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{docInfo.about}</p>
                  </div>
                  
                  <div className="border-t border-white border-opacity-10 py-4">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                      <p className="text-sm">{docInfo.education}</p>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      <p className="text-sm">{docInfo.languages.join(", ")}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <button 
                    className={`w-full py-3 rounded-lg bg-white text-gray-900 font-medium transition-all duration-300 hover:bg-opacity-90 transform hover:scale-[0.98]`}
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            </div>
            {/* Right column - Booking Interface */}
            <div className="lg:col-span-2 p-8">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-8">
                <button
                  onClick={() => setSelectedTab('appointment')}
                  className={`pb-4 px-4 text-sm font-medium border-b-2 transition-all duration-300 ${
                    selectedTab === 'appointment' 
                      ? `border-emerald-500 text-emerald-600` 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => setSelectedTab('info')}
                  className={`pb-4 px-4 text-sm font-medium border-b-2 transition-all duration-300 ${
                    selectedTab === 'info' 
                      ? `border-emerald-500 text-emerald-600` 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Doctor Information
                </button>
              </div>
              
              {selectedTab === 'appointment' ? (
                <>
                  <h2 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorTheme.primary.gradient} mb-6`}>
                    Schedule Your Appointment
                  </h2>
                  
                  <p className="text-gray-600 mb-8">
                    Select your preferred date and time to schedule an appointment with {docInfo.name}.
                  </p>
                  
                  {/* Booking Process Steps */}
                  <div className="flex items-center mb-8">
                    {['Select Date', 'Choose Time', 'Confirm'].map((step, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === 0 && !selectedDate ? `bg-gradient-to-r ${colorTheme.primary.gradient} text-white` :
                            index === 1 && selectedDate && !selectedTime ? `bg-gradient-to-r ${colorTheme.primary.gradient} text-white` :
                            index === 2 && selectedDate && selectedTime ? `bg-gradient-to-r ${colorTheme.primary.gradient} text-white` :
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-xs mt-2 text-gray-500">{step}</span>
                        </div>
                        
                        {index < 2 && (
                          <div className="flex-1 h-1 mx-2 bg-gray-200">
                            <div className={`h-full ${
                              index === 0 && selectedDate ? `bg-gradient-to-r ${colorTheme.primary.gradient}` :
                              index === 1 && selectedDate && selectedTime ? `bg-gradient-to-r ${colorTheme.primary.gradient}` :
                              ''
                            }`}></div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* Date Selection */}
                  <div className="mb-8">
                    <h3 className="font-medium text-gray-700 mb-3">Select Date</h3>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        placeholderText="Choose a date"
                        inline
                        calendarClassName="bg-white rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Time Selection - Only show if date is selected */}
                  {selectedDate && (
                    <div className="mb-8 animate-fadeIn">
                      <h3 className="font-medium text-gray-700 mb-3">Select Time</h3>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.time}
                              onClick={() => slot.available && setSelectedTime(slot.time)}
                              disabled={!slot.available}
                              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                !slot.available 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                  : selectedTime === slot.time
                                    ? `bg-gradient-to-r ${colorTheme.primary.gradient} text-white shadow-sm`
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {slot.time}
                              {!slot.available && <span className="block text-xs mt-1">(Booked)</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Appointment Summary - Show if both date and time are selected */}
                  {selectedDate && selectedTime && (
                    <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-100 animate-fadeIn">
                      <h3 className="font-medium text-gray-700 mb-4">Appointment Summary</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorTheme.primary.light}`}>
                            <svg className={`w-5 h-5 ${colorTheme.primary.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-xs text-gray-500">Doctor</p>
                            <p className="font-medium">{docInfo.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorTheme.primary.light}`}>
                            <svg className={`w-5 h-5 ${colorTheme.primary.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-xs text-gray-500">Speciality</p>
                            <p className="font-medium">{docInfo.speciality}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorTheme.secondary.light}`}>
                            <svg className={`w-5 h-5 ${colorTheme.secondary.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-medium">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorTheme.secondary.light}`}>
                            <svg className={`w-5 h-5 ${colorTheme.secondary.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-xs text-gray-500">Time</p>
                            <p className="font-medium">{selectedTime}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mt-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Consultation Fee</span>
                          <span className="font-medium">$150.00</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                          <span>Platform Fee</span>
                          <span>$10.00</span>
                        </div>
                        <div className="flex justify-between items-center font-bold">
                          <span>Total</span>
                          <span className={`${colorTheme.primary.text}`}>$160.00</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Book Button */}
                  <div className={`relative group ${(!selectedDate || !selectedTime) ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-300 ${bookingConfirmed ? 'hidden' : ''}`}></div>
                    <button
                      onClick={handleBooking}
                      disabled={!selectedDate || !selectedTime || bookingConfirmed}
                      className={`relative w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] ${bookingConfirmed ? 'hidden' : ''}`}
                    >
                      Confirm Appointment
                    </button>
                  </div>
                  
                  {/* Confirmation Message */}
                  {bookingConfirmed && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center animate-fadeIn">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Appointment Confirmed!</h3>
                      <p className="text-gray-600 mb-4">
                        Your appointment with {docInfo.name} has been scheduled for {selectedDate?.toLocaleDateString()} at {selectedTime}.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <button
                          onClick={() => navigate("/my-appointments")}
                          className={`px-5 py-2 bg-gradient-to-r ${colorTheme.primary.gradient} text-white rounded-lg hover:shadow-md transition-all duration-300`}
                        >
                          View My Appointments
                        </button>
                        <button
                          onClick={() => navigate("/doctors")}
                          className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
                        >
                          Book Another Appointment
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="animate-fadeIn">
                  <h2 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorTheme.secondary.gradient} mb-6`}>
                    Doctor Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Heart Disease', 'Cardiac Rehabilitation', 'Preventive Cardiology', 'Hypertension'].map((specialty, index) => (
                          <span key={index} className={`px-3 py-1 rounded-full text-sm ${colorTheme.primary.light} ${colorTheme.primary.text}`}>
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Education & Training</h3>
                      <ul className="space-y-3">
                        {[
                          { degree: 'M.D.', institution: 'Harvard Medical School', year: '2008' },
                          { degree: 'Residency', institution: 'Massachusetts General Hospital', year: '2012' },
                          { degree: 'Fellowship', institution: 'Cleveland Clinic', year: '2014' }
                        ].map((edu, index) => (
                          <li key={index} className="flex">
                            <div className={`mt-1.5 w-2 h-2 rounded-full ${colorTheme.secondary.background} flex-shrink-0`}></div>
                            <div className="ml-4">
                              <p className="font-medium text-gray-800">{edu.degree}</p>
                              <p className="text-sm text-gray-600">{edu.institution}, {edu.year}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Patient Reviews</h3>
                      <div className="space-y-4">
                        {[
                          { name: 'Michael Johnson', rating: 5, comment: 'Dr. Chen was thorough, knowledgeable, and took the time to answer all my questions.' },
                          { name: 'Sarah Williams', rating: 4, comment: 'Great doctor who really listens. The appointment felt a bit rushed, but overall a positive experience.' }
                        ].map((review, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{review.name}</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg 
                                    key={star} 
                                    className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                      <button className={`mt-4 text-sm ${colorTheme.primary.text} font-medium flex items-center`}>
                        View all {docInfo.reviews} reviews
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add global CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Appointment;