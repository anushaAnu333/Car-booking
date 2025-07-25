"use client";

import { useState } from "react";
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download,
  Video,
  FileText,
  Users,
} from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", count: 24 },
    { id: "booking", name: "Booking & Reservations", count: 8 },
    { id: "payment", name: "Payment & Billing", count: 6 },
    { id: "vehicle", name: "Vehicle & Rental", count: 5 },
    { id: "account", name: "Account & Profile", count: 5 },
  ];

  const faqs = [
    {
      id: "1",
      category: "booking",
      question: "How do I make a car rental reservation?",
      answer:
        "To make a reservation, simply browse our available cars, select your rental start and end dates, choose your preferred vehicle, and complete the booking process with your payment information. You'll receive a confirmation email with all the details.",
    },
    {
      id: "2",
      category: "booking",
      question: "Can I modify or cancel my reservation?",
      answer:
        "Yes, you can modify or cancel your reservation up to 24 hours before your rental start date without penalty. To make changes, go to your bookings page and select the reservation you want to modify.",
    },
    {
      id: "3",
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards with a Visa or MasterCard logo. Cash payments are not accepted for security reasons.",
    },
    {
      id: "4",
      category: "payment",
      question: "When will I be charged for my rental?",
      answer:
        "A pre-authorization hold is placed on your card when you make the reservation. The final charge is processed when you return the vehicle, which includes any additional fees or charges.",
    },
    {
      id: "5",
      category: "vehicle",
      question: "What do I need to bring when picking up my rental car?",
      answer:
        "You need to bring a valid driver's license, the credit card used for booking, and meet our minimum age requirement of 21 years old. Additional drivers must also present their valid driver's license.",
    },
    {
      id: "6",
      category: "vehicle",
      question: "What if the car has damage when I pick it up?",
      answer:
        "Before leaving the rental location, inspect the vehicle thoroughly and report any existing damage to our staff. We'll document it to ensure you're not charged for pre-existing damage when you return the car.",
    },
    {
      id: "7",
      category: "account",
      question: "How do I update my profile information?",
      answer:
        "You can update your profile information by logging into your account and going to the Profile section. There you can edit your personal details, contact information, and preferences.",
    },
    {
      id: "8",
      category: "account",
      question: "How do I reset my password?",
      answer:
        'Click on "Forgot Password" on the login page, enter your email address, and we\'ll send you a link to reset your password. Follow the instructions in the email to create a new password.',
    },
    {
      id: "9",
      category: "booking",
      question: "Do you offer one-way rentals?",
      answer:
        "Yes, we offer one-way rentals between select locations. Additional fees may apply for one-way rentals. You can check availability and pricing when making your reservation.",
    },
    {
      id: "10",
      category: "vehicle",
      question: "What happens if I return the car late?",
      answer:
        "Late returns are subject to additional charges. If you know you'll be late, please contact us as soon as possible. We offer a 29-minute grace period, after which additional day charges may apply.",
    },
  ];

  const guides = [
    {
      title: "First Time Renter Guide",
      description:
        "Everything you need to know for your first rental experience",
      type: "pdf",
      icon: FileText,
    },
    {
      title: "How to Inspect Your Rental Car",
      description: "Step-by-step video guide for vehicle inspection",
      type: "video",
      icon: Video,
    },
    {
      title: "Understanding Your Rental Agreement",
      description: "Detailed explanation of terms and conditions",
      type: "pdf",
      icon: FileText,
    },
    {
      title: "Emergency Roadside Assistance",
      description: "What to do if you have car trouble during your rental",
      type: "guide",
      icon: Book,
    },
  ];

  const contactOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      icon: MessageCircle,
      action: "Start Chat",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Phone Support",
      description: "Speak directly with a support representative",
      availability: "1-800-MORENT-1",
      icon: Phone,
      action: "Call Now",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "support@morent.com",
      icon: Mail,
      action: "Send Email",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Community Forum",
      description: "Connect with other users and get community help",
      availability: "Join the discussion",
      icon: Users,
      action: "Visit Forum",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Help & Support
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Find answers to your questions and get the help you need
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Search for help topics, guides, or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 text-lg text-gray-900 bg-white rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Contact Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Get Help Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${option.color} mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {option.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {option.availability}
                  </p>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                    {option.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FAQ Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Browse by Category
              </h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}>
                    <span className="font-medium">{category.name}</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        activeCategory === category.id
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-200 text-gray-600"
                      }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                  Quick Links
                </h4>
                <div className="space-y-3">
                  <a
                    href="/contact"
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Contact Us
                  </a>
                  <a
                    href="/bookings"
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    My Bookings
                  </a>
                  <a
                    href="/profile"
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Account Settings
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Help Guides */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Popular Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((guide, index) => {
                  const Icon = guide.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4 flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {guide.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {guide.description}
                          </p>
                          <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                            <Download className="w-4 h-4 mr-1" />
                            {guide.type === "video" ? "Watch" : "Download"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredFaqs.length} question
                  {filteredFaqs.length !== 1 ? "s" : ""} found
                </span>
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or browse a different category.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFaq === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-4 pb-4">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Still Need Help Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Still need help?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Can&apos;t find what you&apos;re looking for? Our support team
                  is here to help you with any questions or issues you might
                  have.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start Live Chat
                  </button>
                  <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium border border-blue-200">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
