import { useState, useEffect } from "react";
import { FaTimes, FaCheck, FaPaperclip, FaChevronDown } from "react-icons/fa";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { RiTicket2Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const EnhancedSupportCenter = () => {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({
    name: "",
    email: "",
    subject: "",
    issueType: "general",
    description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [faqResults, setFaqResults] = useState([]);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showTicketForm, setShowTicketForm] = useState(false);

  // Sample FAQ data
  const faqData = [
    {
      id: 1,
      question: "How do I track my order?",
      answer:
        "You can track your order using the tracking number sent to your email.",
      category: "orders",
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase with original receipt.",
      category: "returns",
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days within the continental US.",
      category: "shipping",
    },
    {
      id: 4,
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide.",
      category: "shipping",
    },
    {
      id: 5,
      question: "How do I change my account information?",
      answer:
        'You can update your account details in the "Account Settings" section.',
      category: "account",
    },
  ];

  // Categories for FAQ
  const categories = [
    { id: "all", name: "All Topics" },
    { id: "orders", name: "Orders" },
    { id: "returns", name: "Returns & Exchanges" },
    { id: "shipping", name: "Shipping" },
    { id: "account", name: "Account" },
    { id: "payments", name: "Payments" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle ticket submission
  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("http://localhost:4000/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: ticketDetails.name,
          email: ticketDetails.email,
          subject: ticketDetails.subject,
          message: ticketDetails.description,
          issueType: ticketDetails.issueType,
        }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit ticket");
      }

      setTicketSubmitted(true);
    } catch (error) {
      console.error("Ticket submission error:", error);
      setSubmitError(
        error.message || "Failed to submit ticket. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Search FAQ
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFaqResults([]);
      return;
    }
    const results = faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFaqResults(results);
  }, [searchQuery]);

  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Filter FAQs by category
  const filteredFaqs =
    activeCategory === "all"
      ? faqData
      : faqData.filter((faq) => faq.category === activeCategory);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl  text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions or contact our support team
          </p>
        </div>

        {/* Ticket CTA Section */}
        {!showTicketForm && !ticketSubmitted && (
          <div className="bg-white rounded-xl p-8 mb-12 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <RiTicket2Line className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Can't find what you're looking for?
                  </h3>
                  <p className="text-gray-600">
                    Our support team is ready to help with any questions you
                    might have.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTicketForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap min-w-fit"
              >
                <RiTicket2Line /> Contact Support
              </button>
            </div>
          </div>
        )}

        {/* Ticket Submission Success Message */}
        {ticketSubmitted && (
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 shadow-lg mb-12">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <FaCheck className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Ticket Submitted Successfully!
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We've received your support ticket and will respond within 24
                hours. A confirmation has been sent to your email address.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => {
                    setTicketSubmitted(false);
                    setTicketDetails({
                      name: "",
                      email: "",
                      subject: "",
                      issueType: "general",
                      description: "",
                    });
                    setShowTicketForm(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition shadow-md hover:shadow-lg"
                >
                  Submit Another Ticket
                </button>
                <button
                  onClick={() => {
                    setTicketSubmitted(false);
                    setShowTicketForm(false);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-lg transition shadow-md hover:shadow-lg"
                >
                  Back to Support
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ticket Submission Form */}
        {showTicketForm && !ticketSubmitted && (
          <div className="bg-white rounded-xl p-8 mb-12 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Contact Support
              </h2>
              <button
                onClick={() => {
                  setShowTicketForm(false);
                  setTicketSubmitted(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {submitError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {submitError}
              </div>
            )}
            <form onSubmit={handleTicketSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 mb-2 text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    value={ticketDetails.name}
                    onChange={(e) =>
                      setTicketDetails({
                        ...ticketDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 mb-2 text-sm font-medium"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    value={ticketDetails.email}
                    onChange={(e) =>
                      setTicketDetails({
                        ...ticketDetails,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 mb-2 text-sm font-medium"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  value={ticketDetails.subject}
                  onChange={(e) =>
                    setTicketDetails({
                      ...ticketDetails,
                      subject: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="issueType"
                  className="block text-gray-700 mb-2 text-sm font-medium"
                >
                  Issue Type *
                </label>
                <div className="relative">
                  <select
                    id="issueType"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none shadow-sm"
                    value={ticketDetails.issueType}
                    onChange={(e) =>
                      setTicketDetails({
                        ...ticketDetails,
                        issueType: e.target.value,
                      })
                    }
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Issue</option>
                    <option value="return">Return/Exchange</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaChevronDown className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-gray-700 mb-2 text-sm font-medium"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  value={ticketDetails.description}
                  onChange={(e) =>
                    setTicketDetails({
                      ...ticketDetails,
                      description: e.target.value,
                    })
                  }
                  required
                ></textarea>
                <p className="text-gray-500 text-xs mt-1">
                  Please provide as much detail as possible
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <RiTicket2Line /> Submit Ticket
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTicketForm(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Browse our knowledge base for quick answers
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`flex-shrink-0 px-5 py-2 mr-3 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {searchQuery ? (
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              {faqResults.length > 0 ? (
                faqResults.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-white transition"
                  >
                    <div
                      className="p-5 cursor-pointer"
                      onClick={() => toggleFaq(item.id)}
                    >
                      <div className="flex items-start">
                        <HiOutlineQuestionMarkCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">
                            {item.question}
                          </h4>
                          {expandedFaq === item.id && (
                            <p className="text-gray-600 mt-3 pl-2 border-l-2 border-blue-200">
                              {item.answer}
                            </p>
                          )}
                        </div>
                        <FaChevronDown
                          className={`text-gray-400 mt-1 ml-2 transition-transform ${
                            expandedFaq === item.id
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <FaSearch className="mx-auto text-gray-400 text-3xl mb-3" />
                  <p className="text-gray-500">
                    No results found for "{searchQuery}"
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-blue-600 hover:underline mt-2 text-sm"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-blue-300 transition hover:shadow-sm"
                >
                  <button
                    className="w-full text-left flex items-start"
                    onClick={() => toggleFaq(item.id)}
                  >
                    <HiOutlineQuestionMarkCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-2">
                        {item.question}
                      </h4>
                      {expandedFaq === item.id && (
                        <p className="text-gray-600 mt-3 pl-2 border-l-2 border-blue-200">
                          {item.answer}
                        </p>
                      )}
                    </div>
                    <FaChevronDown
                      className={`text-gray-400 mt-1 ml-2 transition-transform ${
                        expandedFaq === item.id ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnhancedSupportCenter;
