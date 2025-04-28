// Doctors.jsx
import React, { useState, useEffect } from "react";
import { colorTheme } from "../components/ColorTheme";
import { doctors as doctorsData } from "../assets/assets"; // استيراد بيانات الدكاترة من ملف assets

const Doctors = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // تحميل بيانات الدكاترة من ملف assets
  useEffect(() => {
    // بما أن بيانات الدكاترة من assets لا تحتوي على خاصية availability،
    // نفترض أن كل الدكاترة متاحون
    setDoctors(doctorsData);
    setFilteredDoctors(doctorsData);
  }, []);

  // Intersection Observer لتفعيل تأثيرات الأنيميشن عند ظهور القسم
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("doctors-container");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // تطبيق الفلاتر والبحث
  useEffect(() => {
    let results = [...doctors];

    // تطبيق فلتر التخصص إذا لم يكن "All"
    if (activeFilter !== "All") {
      results = results.filter((doctor) => doctor.speciality === activeFilter);
    }

    // تطبيق فلتر البحث حسب الاسم أو التخصص
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      results = results.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(lowercaseSearch) ||
          doctor.speciality.toLowerCase().includes(lowercaseSearch)
      );
    }

    setFilteredDoctors(results);
  }, [activeFilter, searchTerm, doctors]);

  // استخراج جميع التخصصات المميزة للفلاتر
  const specialties = [
    "All",
    ...new Set(doctors.map((doctor) => doctor.speciality)),
  ];

  // دالة لإرجاع لون حسب الفهرس
  const getColor = (index) => {
    const accentIndex = index % colorTheme.accent.length;
    return colorTheme.accent[accentIndex];
  };

  // التعامل مع اختيار دكتور محدد
  const handleDoctorSelection = (id) => {
    console.log(`Selected doctor with ID: ${id}`);
    // هنا يمكنك الانتقال إلى صفحة تفاصيل الطبيب أو حجز موعد
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* ترويسة الصفحة */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1
          className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorTheme.primary.gradient}`}
        >
          Our Expert Doctors
        </h1>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Schedule appointments with top-rated medical professionals across
          various specialties
        </p>
      </div>

      {/* قسم البحث والفلاتر */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-lg shadow-sm p-4">
          {/* حقل البحث */}
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full md:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* فلاتر التخصص */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
            {specialties.slice(0, 8).map((specialty) => (
              <button
                key={specialty}
                onClick={() => setActiveFilter(specialty)}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                  activeFilter === specialty
                    ? `text-white bg-gradient-to-r ${colorTheme.primary.gradient} shadow-sm`
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {specialty}
              </button>
            ))}
            {specialties.length > 8 && (
              <div className="relative group">
                <button className="px-3 py-1 text-sm rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200">
                  More +
                </button>
                <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    {specialties.slice(8).map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => setActiveFilter(specialty)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* شبكة عرض الدكاترة */}
      <div
        id="doctors-container"
        className={`max-w-7xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor, index) => {
              const color = getColor(index);
              return (
                <div
                  key={doctor._id}
                  onClick={() => handleDoctorSelection(doctor._id)}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all duration-500 transform hover:-translate-y-2"
                  style={{
                    transitionDelay: `${50 * (index % 8)}ms`,
                  }}
                >
                  <div className="relative">
                    <img
                      className="w-full h-48 object-cover object-center"
                      src={doctor.image}
                      alt={doctor.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

                    {/* شارة التخصص */}
                    <div
                      className={`absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium ${color.text}`}
                    >
                      {doctor.speciality}
                    </div>

                    {/* شارة التوفر */}
                    <div className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium bg-emerald-500 text-white">
                      Available
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{doctor.experience}</span>
                    </div>

                    {/* زر الحجز */}
                    <button
                      className={`w-full py-2 mt-2 rounded-lg bg-gradient-to-r ${color.gradient} text-white font-medium transform transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-gray-100 text-gray-500 mb-4">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No doctors found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setActiveFilter("All");
                setSearchTerm("");
              }}
              className={`mt-4 px-4 py-2 rounded-md bg-gradient-to-r ${colorTheme.primary.gradient} text-white font-medium`}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredDoctors.length > 0 && (
        <div className="max-w-7xl mx-auto mt-8 flex justify-center">
          <nav
            className="relative z-10 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="#"
              aria-current="page"
              className={`z-10 bg-gradient-to-r ${colorTheme.primary.gradient} border-emerald-500 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
            >
              1
            </a>

            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              2
            </a>

            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>

            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              8
            </a>

            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Doctors;
