


"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const offices = [
    {
      city: "New York",
      address: "123 Broadway Street, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "newyork@morent.com",
      hours: "Mon-Sun: 6:00 AM - 11:00 PM",
    },
    {
      city: "Los Angeles",
      address: "456 Sunset Boulevard, CA 90028",
      phone: "+1 (555) 234-5678",
      email: "losangeles@morent.com",
      hours: "Mon-Sun: 6:00 AM - 11:00 PM",
    },
   
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our customer service team",
      details: "1-800-MORENT-1",
      action: "Call Now",
      highlight: "24/7 Available",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      details: "support@morent.com",
      action: "Send Email",
      highlight: "Quick Response",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      details: "Available 24/7",
      action: "Start Chat",
      highlight: "Instant Help",
    },
  ];

  const faqs = [
    {
      question: "What do I need to rent a car?",
      answer: "You need a valid driver's license, credit card, and to meet our minimum age requirement of 21 years old."
    },
    {
      question: "Can I cancel my reservation?",
      answer: "Yes, you can cancel your reservation up to 24 hours before pickup time without penalty."
    },
    {
      question: "Is insurance included?",
      answer: "Basic insurance is included, but we offer additional coverage options for extra peace of mind."
    },
    {
      question: "What if I return the car late?",
      answer: "Late returns are subject to additional fees. Please contact us if you need to extend your rental."
    },
    {
      question: "Do you offer one-way rentals?",
      answer: "Yes, we offer one-way rentals between participating locations for an additional fee."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards and debit cards. Cash payments are not accepted."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Professional Contact Methods */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the most convenient way to reach our professional support team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="group relative text-center p-8 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200"
                >
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                      {method.highlight}
                    </span>
                  </div>
                  
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{method.description}</p>
                  <p className="text-blue-600 font-bold text-lg mb-6">
                    {method.details}
                  </p>
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
                    {method.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Contact Form & Office Info */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-lg p-2 mr-3">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </h2>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Fill out the form below and we&apos;ll get back to you within 24 hours. All fields marked with * are required.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required>
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Support</option>
                      <option value="complaint">Complaint</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  ) : (
                    <Send className="w-5 h-5 mr-3" />
                  )}
                  {isSubmitting ? "Sending Message..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Enhanced Office Locations */}
            <div>
              <div className="flex items-center mb-8">
                <div className="bg-blue-100 rounded-lg p-2 mr-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Locations
                </h2>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Visit one of our convenient locations or contact us directly. We&apos;re here to serve you.
              </p>
              
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      {office.city}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{office.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{office.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-600 rounded-full px-6 py-3 text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to the most common questions about our car rental services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    ?
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed ml-9">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Contact Our Support Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}