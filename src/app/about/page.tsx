// import { Car, Users, Award, Shield, Clock, Heart } from "lucide-react";

// export default function AboutPage() {
//   const stats = [
//     { label: "Happy Customers", value: "50,000+", icon: Users },
//     { label: "Cars Available", value: "1,200+", icon: Car },
//     { label: "Years Experience", value: "15+", icon: Award },
//     { label: "Cities Covered", value: "50+", icon: Shield },
//   ];

//   const features = [
//     {
//       icon: Clock,
//       title: "24/7 Support",
//       description:
//         "Round-the-clock customer service for all your rental needs.",
//     },
//     {
//       icon: Shield,
//       title: "Secure & Safe",
//       description: "All our vehicles are regularly maintained and insured.",
//     },
//     {
//       icon: Heart,
//       title: "Customer First",
//       description: "Your satisfaction is our top priority in everything we do.",
//     },
//     {
//       icon: Award,
//       title: "Best Prices",
//       description: "Competitive rates with no hidden fees or surprises.",
//     },
//   ];

//   const team = [
//     {
//       name: "Sarah Johnson",
//       role: "CEO & Founder",
//       image: "/user-avatar.svg",
//       description: "15+ years in automotive industry",
//     },
//     {
//       name: "Michael Chen",
//       role: "Head of Operations",
//       image: "/user-avatar.svg",
//       description: "Expert in fleet management",
//     },
//     {
//       name: "Emily Davis",
//       role: "Customer Experience",
//       image: "/user-avatar.svg",
//       description: "Dedicated to customer satisfaction",
//     },
//     {
//       name: "David Wilson",
//       role: "Technology Lead",
//       image: "/user-avatar.svg",
//       description: "Innovation in car rental tech",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">About MORENT</h1>
//           <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
//             Your trusted partner in premium car rental services since 2008
//           </p>
//           <div className="flex justify-center">
//             <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
//               <Car className="w-12 h-12" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <div key={index} className="text-center">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//                     <Icon className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <div className="text-3xl font-bold text-gray-900 mb-2">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm text-gray-600">{stat.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Story Section */}
//       <div className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-6">
//                 Our Story
//               </h2>
//               <p className="text-lg text-gray-600 mb-6">
//                 Founded in 2008, MORENT began as a small family business with a
//                 simple mission: to provide reliable, affordable, and convenient
//                 car rental services to travelers and locals alike.
//               </p>
//               <p className="text-lg text-gray-600 mb-6">
//                 Over the years, we&apos;ve grown from a single location to a
//                 nationwide network, but our commitment to exceptional customer
//                 service remains unchanged. We believe that renting a car should
//                 be easy, transparent, and stress-free.
//               </p>
//               <p className="text-lg text-gray-600">
//                 Today, we&apos;re proud to serve over 50,000 customers annually
//                 with our fleet of over 1,200 well-maintained vehicles across 50+
//                 cities.
//               </p>
//             </div>
//             <div className="lg:order-first">
//               <div className="bg-blue-100 rounded-2xl p-8 text-center">
//                 <Car className="w-32 h-32 mx-auto text-blue-600 mb-4" />
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                   Premium Fleet
//                 </h3>
//                 <p className="text-gray-600">
//                   From economy to luxury vehicles, we have the perfect car for
//                   every occasion
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Why Choose MORENT?
//             </h2>
//             <p className="text-lg text-gray-600">
//               We&apos;re committed to providing the best car rental experience
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <div
//                   key={index}
//                   className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
//                     <Icon className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Team Section */}
//       <div className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Meet Our Team
//             </h2>
//             <p className="text-lg text-gray-600">
//               The passionate people behind MORENT&apos;s success
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {team.map((member, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
//                 <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   {member.name}
//                 </h3>
//                 <p className="text-blue-600 font-medium mb-2">{member.role}</p>
//                 <p className="text-sm text-gray-600">{member.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mission Section */}
//       <div className="py-16 bg-blue-600 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
//           <p className="text-xl mb-8 max-w-3xl mx-auto">
//             To revolutionize the car rental industry by providing exceptional
//             service, innovative technology, and unmatched convenience to every
//             customer.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Innovation</h3>
//               <p className="text-blue-100">
//                 Continuously improving our technology and services
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Reliability</h3>
//               <p className="text-blue-100">
//                 Dependable vehicles and consistent quality service
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Excellence</h3>
//               <p className="text-blue-100">
//                 Exceeding expectations in every customer interaction
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Car, Users, Award, Shield, Clock, Heart } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: Users },
    { label: "Cars Available", value: "1,200+", icon: Car },
    { label: "Years Experience", value: "15+", icon: Award },
    { label: "Cities Covered", value: "50+", icon: Shield },
  ];

  const features = [
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer service for all your rental needs.",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "All our vehicles are regularly maintained and insured.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our top priority in everything we do.",
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Competitive rates with no hidden fees or surprises.",
    },
  ];

 

  return (
    <div className="min-h-screen bg-gray-50">
    
      {/* Professional Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Building trust through consistent excellence and reliable service
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-8 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Professional Story Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center bg-blue-100 text-blue-600 rounded-full px-4 py-2 text-sm font-semibold mb-6">
                Our Journey
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                Excellence Through Experience
              </h2>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2008, MORENT began as a small family business with
                  a simple mission: to provide reliable, affordable, and
                  convenient car rental services to travelers and locals alike.
                </p>
                <p>
                  Over the years, we&apos;ve grown from a single location to a
                  nationwide network, but our commitment to exceptional customer
                  service remains unchanged. We believe that renting a car
                  should be easy, transparent, and stress-free.
                </p>
                <p>
                  Today, we&apos;re proud to serve over 50,000 customers
                  annually with our fleet of over 1,200 well-maintained vehicles
                  across 50+ cities.
                </p>
              </div>
            </div>

            <div className="lg:order-first">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-blue-100 rounded-2xl p-6 mb-6 inline-block">
                  <Car className="w-20 h-20 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Premium Fleet
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  From economy to luxury vehicles, we have the perfect car for
                  every occasion and budget requirements.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      1,200+
                    </div>
                    <div className="text-sm text-gray-600">Vehicles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      99.9%
                    </div>
                    <div className="text-sm text-gray-600">Reliability</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MORENT?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to providing the best car rental experience
              through professional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-8 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Professional Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The experienced professionals driving MORENT&apos;s continued
              success
            </p>
          </div>

        
        </div>
      </div>

      {/* Professional Mission Section */}
      <div className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl mb-16 max-w-4xl mx-auto text-blue-100 leading-relaxed">
            To revolutionize the car rental industry by providing exceptional
            service, innovative technology, and unmatched convenience to every
            customer while maintaining the highest standards of professionalism.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-white/20 rounded-xl p-4 w-16 h-16 mx-auto mb-6">
                <Shield className="w-8 h-8 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-blue-100 leading-relaxed">
                Continuously improving our technology and services to exceed
                expectations
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-white/20 rounded-xl p-4 w-16 h-16 mx-auto mb-6">
                <Award className="w-8 h-8 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4">Reliability</h3>
              <p className="text-blue-100 leading-relaxed">
                Dependable vehicles and consistent quality service you can trust
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-white/20 rounded-xl p-4 w-16 h-16 mx-auto mb-6">
                <Heart className="w-8 h-8 text-white mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-blue-100 leading-relaxed">
                Exceeding expectations in every customer interaction and service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
