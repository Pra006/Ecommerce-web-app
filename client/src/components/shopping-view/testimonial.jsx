import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Customer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      content:
        "Amazing quality products and super fast delivery! The customer service team was incredibly helpful when I had questions. Highly recommend!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Verified Buyer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      content:
        "Best shopping experience ever. Great prices, wide selection, and the website is very easy to navigate. Will definitely shop here again!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Premium Member",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 4,
      content:
        "Love the exclusive deals available for members. The product quality is consistent and the return process is hassle-free. Great service!",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "First-time Buyer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 5,
      content:
        "I was skeptical at first, but this store exceeded all my expectations. Authentic products, secure checkout, and my order arrived perfectly!",
    },
    {
      id: 5,
      name: "Jessica Lee",
      role: "Loyal Customer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      rating: 5,
      content:
        "Been shopping here for 2 years now. Consistent quality, fair prices, and excellent customer support. They deserve 5 stars!",
    },
    {
      id: 6,
      name: "Robert Martinez",
      role: "Business Customer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      rating: 4,
      content:
        "Perfect for bulk orders. The wholesale pricing is competitive and their B2B team is very professional. Great experience overall!",
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of happy customers who have experienced exceptional
            service and quality products. Read their authentic reviews below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300"
            >
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-blue-600" />
              </div>

              <div className="p-8 relative z-10">
                <div className="mb-4">{renderStars(testimonial.rating)}</div>-
                <p className="text-slate-700 mb-6 leading-relaxed line-clamp-4 min-h-24">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-12 border-t border-b border-slate-200 bg-white rounded-lg shadow-sm">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <p className="text-slate-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.8★</div>
            <p className="text-slate-600">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
            <p className="text-slate-600">Reviews</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
            <p className="text-slate-600">Satisfaction</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">
            Still not sure? Share your experience after your first purchase!
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Write a Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
