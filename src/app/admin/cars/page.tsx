// "use client";

// import { useState, useEffect } from "react";
// import {
//   Car,
//   Settings,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   Save,
//   RefreshCw,
//   Plus,
//   Edit3,
//   Trash2,
// } from "lucide-react";
// import ImageManager from "@/components/ImageManager";

// interface CarType {
//   id: string;
//   name: string;
//   type: string;
//   brand: string;
//   fuel: string;
//   transmission: string;
//   capacity: number;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   images?: string[];
//   imagePublicIds?: string[];
//   isAvailable: boolean;
//   availabilityStatus: "available" | "rented" | "maintenance" | "reserved";
//   currentLocation?: string;
//   locations?: string[];
//   isRecommended?: boolean;
//   isFavorite?: boolean;
// }

// interface Location {
//   id: string;
//   name: string;
//   address: string;
// }

// type AvailabilityStatus = "available" | "rented" | "maintenance" | "reserved";

// export default function AdminCarsPage() {
//   const [cars, setCars] = useState<CarType[]>([]);
//   const [locations, setLocations] = useState<Location[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState<string | null>(null);
//   const [filter, setFilter] = useState<"all" | AvailabilityStatus>("all");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // New car form state
//   const [newCar, setNewCar] = useState({
//     name: "",
//     type: "",
//     brand: "",
//     fuel: "",
//     transmission: "",
//     capacity: 2,
//     price: 0,
//     originalPrice: 0,
//     image: "/cars/placeholder.svg",
//     images: [] as string[],
//     imagePublicIds: [] as string[],
//     isAvailable: true,
//     availabilityStatus: "available" as AvailabilityStatus,
//     currentLocation: "",
//     locations: [] as string[],
//     isRecommended: false,
//     isFavorite: false,
//   });

//   useEffect(() => {
//     fetchCars();
//     fetchLocations();
//   }, []);

//   const fetchCars = async () => {
//     try {
//       const response = await fetch("/api/cars");
//       if (response.ok) {
//         const data = await response.json();
//         setCars(data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch cars:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLocations = async () => {
//     try {
//       const response = await fetch("/api/locations?active=true");
//       if (response.ok) {
//         const data = await response.json();
//         setLocations(data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch locations:", error);
//     }
//   };

//   const getStatusCounts = () => {
//     const counts = {
//       all: cars.length,
//       available: 0,
//       rented: 0,
//       maintenance: 0,
//       reserved: 0,
//     };

//     cars.forEach((car) => {
//       const status = car.availabilityStatus || "available";
//       if (counts.hasOwnProperty(status)) {
//         counts[status as keyof typeof counts]++;
//       }
//     });

//     return counts;
//   };

//   const filteredCars = cars.filter((car) => {
//     const matchesFilter = filter === "all" || car.availabilityStatus === filter;
//     const matchesSearch =
//       car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       car.type.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const statusCounts = getStatusCounts();

//   const updateCarAvailability = async (
//     carId: string,
//     updates: Partial<CarType>
//   ) => {
//     setSaving(carId);
//     try {
//       const response = await fetch(`/api/cars/${carId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updates),
//       });

//       if (response.ok) {
//         const updatedCar = await response.json();
//         setCars((prev) =>
//           prev.map((car) => (car.id === carId ? updatedCar : car))
//         );
//         alert("Car updated successfully!");
//       } else {
//         alert("Failed to update car");
//       }
//     } catch (error) {
//       console.error("Failed to update car:", error);
//       alert("Failed to update car");
//     } finally {
//       setSaving(null);
//     }
//   };

//   const addNewCar = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/cars", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCar),
//       });

//       if (response.ok) {
//         const createdCar = await response.json();
//         setCars((prev) => [...prev, createdCar]);
//         setShowAddForm(false);
//         setNewCar({
//           name: "",
//           type: "",
//           brand: "",
//           fuel: "",
//           transmission: "",
//           capacity: 2,
//           price: 0,
//           originalPrice: 0,
//           image: "/cars/placeholder.svg",
//           images: [],
//           imagePublicIds: [],
//           isAvailable: true,
//           availabilityStatus: "available",
//           currentLocation: "",
//           locations: [],
//           isRecommended: false,
//           isFavorite: false,
//         });
//         alert("Car added successfully!");
//       } else {
//         const error = await response.json();
//         alert(`Failed to add car: ${error.error}`);
//       }
//     } catch (error) {
//       console.error("Failed to add car:", error);
//       alert("Failed to add car");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteCar = async (carId: string) => {
//     if (!confirm("Are you sure you want to delete this car?")) return;

//     try {
//       setSaving(carId);
//       const response = await fetch(`/api/cars/${carId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         setCars((prev) => prev.filter((car) => car.id !== carId));
//         alert("Car deleted successfully!");
//       } else {
//         alert("Failed to delete car");
//       }
//     } catch (error) {
//       console.error("Failed to delete car:", error);
//       alert("Failed to delete car");
//     } finally {
//       setSaving(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading cars...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 Cars Management
//               </h1>
//               <p className="text-gray-600">
//                 Manage your entire car fleet - availability, pricing, and
//                 details
//               </p>
//             </div>
//             <button
//               onClick={() => setShowAddForm(!showAddForm)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2">
//               <Plus className="w-5 h-5" />
//               <span>Add New Car</span>
//             </button>
//           </div>
//         </div>

//         {/* Add New Car Form */}
//         {showAddForm && (
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">
//               Add New Car
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Car Name
//                 </label>
//                 <input
//                   type="text"
//                   value={newCar.name}
//                   onChange={(e) =>
//                     setNewCar({ ...newCar, name: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                   placeholder="BMW X3"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Brand
//                 </label>
//                 <input
//                   type="text"
//                   value={newCar.brand}
//                   onChange={(e) =>
//                     setNewCar({ ...newCar, brand: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                   placeholder="BMW"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Type
//                 </label>
//                 <select
//                   value={newCar.type}
//                   onChange={(e) =>
//                     setNewCar({ ...newCar, type: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2">
//                   <option value="">Select Type</option>
//                   <option value="SUV">SUV</option>
//                   <option value="Sport">Sport</option>
//                   <option value="Sedan">Sedan</option>
//                   <option value="Hatchback">Hatchback</option>
//                   <option value="Coupe">Coupe</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Fuel
//                 </label>
//                 <input
//                   type="text"
//                   value={newCar.fuel}
//                   onChange={(e) =>
//                     setNewCar({ ...newCar, fuel: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                   placeholder="70L"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Transmission
//                 </label>
//                 <select
//                   value={newCar.transmission}
//                   onChange={(e) =>
//                     setNewCar({ ...newCar, transmission: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2">
//                   <option value="">Select Transmission</option>
//                   <option value="Manual">Manual</option>
//                   <option value="Automatic">Automatic</option>
//                   <option value="Electric">Electric</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Capacity
//                 </label>
//                 <select
//                   value={newCar.capacity}
//                   onChange={(e) =>
//                     setNewCar({ ...newCar, capacity: Number(e.target.value) })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2">
//                   <option value={2}>2 Person</option>
//                   <option value={4}>4 Person</option>
//                   <option value={6}>6 Person</option>
//                   <option value={8}>8 Person</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Price per Day ($)
//                 </label>
//                 <input
//                   type="number"
//                   value={newCar.price}
//                   onChange={(e) =>
//                     setNewCar({ ...newCar, price: Number(e.target.value) })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                   placeholder="99"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Original Price ($)
//                 </label>
//                 <input
//                   type="number"
//                   value={newCar.originalPrice}
//                   onChange={(e) =>
//                     setNewCar({
//                       ...newCar,
//                       originalPrice: Number(e.target.value),
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2"
//                   placeholder="120"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Availability Status
//                 </label>
//                 <select
//                   value={newCar.availabilityStatus}
//                   onChange={(e) =>
//                     setNewCar({
//                       ...newCar,
//                       availabilityStatus: e.target.value as AvailabilityStatus,
//                       isAvailable: e.target.value === "available",
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2">
//                   <option value="available">Available</option>
//                   <option value="rented">Rented</option>
//                   <option value="maintenance">Maintenance</option>
//                   <option value="reserved">Reserved</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Current Location
//                 </label>
//                 <select
//                   value={newCar.currentLocation}
//                   onChange={(e) =>
//                     setNewCar({ ...newCar, currentLocation: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2">
//                   <option value="">Select Location</option>
//                   {locations.map((location) => (
//                     <option key={location.id} value={location.id}>
//                       {location.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={newCar.isRecommended}
//                     onChange={(e) =>
//                       setNewCar({ ...newCar, isRecommended: e.target.checked })
//                     }
//                     className="mr-2"
//                   />
//                   Recommended
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={newCar.isFavorite}
//                     onChange={(e) =>
//                       setNewCar({ ...newCar, isFavorite: e.target.checked })
//                     }
//                     className="mr-2"
//                   />
//                   Popular
//                 </label>
//               </div>
//             </div>

//             {/* Image Management */}
//             <div className="col-span-full">
//               <ImageManager
//                 images={newCar.images}
//                 imagePublicIds={newCar.imagePublicIds}
//                 onImagesChange={(images, publicIds) => {
//                   setNewCar({
//                     ...newCar,
//                     images,
//                     imagePublicIds: publicIds,
//                     image: images[0] || "/cars/placeholder.svg", // Set first image as primary
//                   });
//                 }}
//                 maxImages={4}
//               />
//             </div>

//             <div className="flex justify-end space-x-4 mt-6">
//               <button
//                 onClick={() => setShowAddForm(false)}
//                 className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
//                 Cancel
//               </button>
//               <button
//                 onClick={addNewCar}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                 Add Car
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Search and Filter */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//             <div className="flex-1 max-w-md">
//               <input
//                 type="text"
//                 placeholder="Search cars by name, brand, or type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex space-x-2">
//               {Object.entries(statusCounts).map(([status, count]) => (
//                 <button
//                   key={status}
//                   onClick={() =>
//                     setFilter(status as "all" | AvailabilityStatus)
//                   }
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                     filter === status
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}>
//                   {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Cars Grid */}
//         <div className="grid grid-cols-1 gap-6">
//           {filteredCars.map((car) => (
//             <CarManagementCard
//               key={car.id}
//               car={car}
//               locations={locations}
//               onUpdate={updateCarAvailability}
//               onDelete={deleteCar}
//               saving={saving === car.id}
//             />
//           ))}
//         </div>

//         {filteredCars.length === 0 && (
//           <div className="text-center py-12">
//             <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">
//               No cars found matching your criteria
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Individual car management card component
// function CarManagementCard({
//   car,
//   locations,
//   onUpdate,
//   onDelete,
//   saving,
// }: {
//   car: CarType;
//   locations: Location[];
//   onUpdate: (carId: string, updates: Partial<CarType>) => void;
//   onDelete: (carId: string) => void;
//   saving: boolean;
// }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState(car);

//   const getStatusIcon = (statusValue: string) => {
//     switch (statusValue) {
//       case "available":
//         return <CheckCircle className="w-5 h-5 text-green-600" />;
//       case "rented":
//         return <Car className="w-5 h-5 text-red-600" />;
//       case "maintenance":
//         return <Settings className="w-5 h-5 text-yellow-600" />;
//       case "reserved":
//         return <Clock className="w-5 h-5 text-blue-600" />;
//       default:
//         return <AlertCircle className="w-5 h-5 text-gray-600" />;
//     }
//   };

//   const getStatusColor = (statusValue: string) => {
//     switch (statusValue) {
//       case "available":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "rented":
//         return "bg-red-100 text-red-800 border-red-200";
//       case "maintenance":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "reserved":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const handleSave = () => {
//     onUpdate(car.id, {
//       ...editForm,
//       isAvailable: editForm.availabilityStatus === "available",
//     });
//     setIsEditing(false);
//   };

//   const handleQuickStatusUpdate = (status: AvailabilityStatus) => {
//     onUpdate(car.id, {
//       availabilityStatus: status,
//       isAvailable: status === "available",
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <div className="flex items-start space-x-6">
//         {/* Car Image */}
//         <img
//           src={car.images?.[0] || car.image}
//           alt={car.name}
//           className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
//         />

//         {/* Car Details */}
//         <div className="flex-1 min-w-0">
//           {isEditing ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.name}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, name: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Brand
//                 </label>
//                 <input
//                   type="text"
//                   value={editForm.brand}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, brand: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Type
//                 </label>
//                 <select
//                   value={editForm.type}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, type: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
//                   <option value="SUV">SUV</option>
//                   <option value="Sport">Sport</option>
//                   <option value="Sedan">Sedan</option>
//                   <option value="Hatchback">Hatchback</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Price ($)
//                 </label>
//                 <input
//                   type="number"
//                   value={editForm.price}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, price: Number(e.target.value) })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <select
//                   value={editForm.availabilityStatus}
//                   onChange={(e) =>
//                     setEditForm({
//                       ...editForm,
//                       availabilityStatus: e.target.value as AvailabilityStatus,
//                       isAvailable: e.target.value === "available",
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
//                   <option value="available">Available</option>
//                   <option value="rented">Rented</option>
//                   <option value="maintenance">Maintenance</option>
//                   <option value="reserved">Reserved</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Location
//                 </label>
//                 <select
//                   value={editForm.currentLocation || ""}
//                   onChange={(e) =>
//                     setEditForm({
//                       ...editForm,
//                       currentLocation: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
//                   <option value="">Select Location</option>
//                   {locations.map((location) => (
//                     <option key={location.id} value={location.id}>
//                       {location.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Image Management in Edit Mode */}
//               <div className="col-span-full">
//                 <ImageManager
//                   images={editForm.images || [editForm.image]}
//                   imagePublicIds={editForm.imagePublicIds || []}
//                   onImagesChange={(images, publicIds) => {
//                     setEditForm({
//                       ...editForm,
//                       images,
//                       imagePublicIds: publicIds,
//                       image: images[0] || "/cars/placeholder.svg",
//                     });
//                   }}
//                   maxImages={4}
//                 />
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {car.name}
//                 </h3>
//                 <div
//                   className={`flex items-center px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
//                     car.availabilityStatus
//                   )}`}>
//                   {getStatusIcon(car.availabilityStatus)}
//                   <span className="ml-2 capitalize">
//                     {car.availabilityStatus}
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
//                 <div>
//                   <span className="font-medium">Brand:</span> {car.brand}
//                 </div>
//                 <div>
//                   <span className="font-medium">Type:</span> {car.type}
//                 </div>
//                 <div>
//                   <span className="font-medium">Fuel:</span> {car.fuel}
//                 </div>
//                 <div>
//                   <span className="font-medium">Transmission:</span>{" "}
//                   {car.transmission}
//                 </div>
//                 <div>
//                   <span className="font-medium">Capacity:</span> {car.capacity}{" "}
//                   Person
//                 </div>
//                 <div>
//                   <span className="font-medium">Price:</span> ${car.price}/day
//                 </div>
//                 <div>
//                   <span className="font-medium">Location:</span>
//                   {car.currentLocation ? (
//                     <span className="ml-1">
//                       {locations.find((loc) => loc.id === car.currentLocation)
//                         ?.name || "Unknown"}
//                     </span>
//                   ) : (
//                     <span className="ml-1 text-gray-400">Not assigned</span>
//                   )}
//                 </div>
//                 <div className="flex space-x-2">
//                   {car.isRecommended && (
//                     <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
//                       Recommended
//                     </span>
//                   )}
//                   {car.isFavorite && (
//                     <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
//                       Popular
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col space-y-2">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={handleSave}
//                 disabled={saving}
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-gray-400 flex items-center space-x-2">
//                 {saving ? (
//                   <>
//                     <RefreshCw className="w-4 h-4 animate-spin" />
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Save</span>
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={() => {
//                   setIsEditing(false);
//                   setEditForm(car);
//                 }}
//                 className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700">
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2">
//                 <Edit3 className="w-4 h-4" />
//                 <span>Edit</span>
//               </button>

//               {/* Quick Status Updates */}
//               <div className="flex flex-col space-y-1">
//                 <button
//                   onClick={() => handleQuickStatusUpdate("available")}
//                   disabled={car.availabilityStatus === "available" || saving}
//                   className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 disabled:bg-gray-300">
//                   Available
//                 </button>
//                 <button
//                   onClick={() => handleQuickStatusUpdate("maintenance")}
//                   disabled={car.availabilityStatus === "maintenance" || saving}
//                   className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700 disabled:bg-gray-300">
//                   Maintenance
//                 </button>
//                 <button
//                   onClick={() => handleQuickStatusUpdate("rented")}
//                   disabled={car.availabilityStatus === "rented" || saving}
//                   className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 disabled:bg-gray-300">
//                   Rented
//                 </button>
//               </div>

//               <button
//                 onClick={() => onDelete(car.id)}
//                 disabled={saving}
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:bg-gray-400 flex items-center space-x-2">
//                 <Trash2 className="w-4 h-4" />
//                 <span>Delete</span>
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import {
  Car,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Save,
  RefreshCw,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  Star,
  Award,
  MapPin,
  Users,
  Fuel,
  Settings2,
} from "lucide-react";
import ImageManager from "@/components/ImageManager";

interface CarType {
  id: string;
  name: string;
  type: string;
  brand: string;
  fuel: string;
  transmission: string;
  capacity: number;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  imagePublicIds?: string[];
  isAvailable: boolean;
  availabilityStatus: "available" | "rented" | "maintenance" | "reserved";
  currentLocation?: string;
  locations?: string[];
  isRecommended?: boolean;
  isFavorite?: boolean;
}

interface Location {
  id: string;
  name: string;
  address: string;
}

type AvailabilityStatus = "available" | "rented" | "maintenance" | "reserved";

export default function AdminCarsPage() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | AvailabilityStatus>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // New car form state
  const [newCar, setNewCar] = useState({
    name: "",
    type: "",
    brand: "",
    fuel: "",
    transmission: "",
    capacity: 2,
    price: 0,
    originalPrice: 0,
    image: "/cars/placeholder.svg",
    images: [] as string[],
    imagePublicIds: [] as string[],
    isAvailable: true,
    availabilityStatus: "available" as AvailabilityStatus,
    currentLocation: "",
    locations: [] as string[],
    isRecommended: false,
    isFavorite: false,
  });

  useEffect(() => {
    fetchCars();
    fetchLocations();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars");
      if (response.ok) {
        const data = await response.json();
        setCars(data);
      }
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/locations?active=true");
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  const getStatusCounts = () => {
    const counts = {
      all: cars.length,
      available: 0,
      rented: 0,
      maintenance: 0,
      reserved: 0,
    };

    cars.forEach((car) => {
      const status = car.availabilityStatus || "available";
      if (counts.hasOwnProperty(status)) {
        counts[status as keyof typeof counts]++;
      }
    });

    return counts;
  };

  const filteredCars = cars.filter((car) => {
    const matchesFilter = filter === "all" || car.availabilityStatus === filter;
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusCounts = getStatusCounts();

  const updateCarAvailability = async (
    carId: string,
    updates: Partial<CarType>
  ) => {
    setSaving(carId);
    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedCar = await response.json();
        setCars((prev) =>
          prev.map((car) => (car.id === carId ? updatedCar : car))
        );
        alert("Car updated successfully!");
      } else {
        alert("Failed to update car");
      }
    } catch (error) {
      console.error("Failed to update car:", error);
      alert("Failed to update car");
    } finally {
      setSaving(null);
    }
  };

  const addNewCar = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });

      if (response.ok) {
        const createdCar = await response.json();
        setCars((prev) => [...prev, createdCar]);
        setShowAddForm(false);
        setNewCar({
          name: "",
          type: "",
          brand: "",
          fuel: "",
          transmission: "",
          capacity: 2,
          price: 0,
          originalPrice: 0,
          image: "/cars/placeholder.svg",
          images: [],
          imagePublicIds: [],
          isAvailable: true,
          availabilityStatus: "available",
          currentLocation: "",
          locations: [],
          isRecommended: false,
          isFavorite: false,
        });
        alert("Car added successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to add car: ${error.error}`);
      }
    } catch (error) {
      console.error("Failed to add car:", error);
      alert("Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (carId: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      setSaving(carId);
      const response = await fetch(`/api/cars/${carId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCars((prev) => prev.filter((car) => car.id !== carId));
        alert("Car deleted successfully!");
      } else {
        alert("Failed to delete car");
      }
    } catch (error) {
      console.error("Failed to delete car:", error);
      alert("Failed to delete car");
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-4"></div>
            <Car className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-slate-600 font-medium">Loading your fleet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                    Fleet Management
                  </h1>
                  <p className="text-slate-600 text-lg">
                    Manage your entire car fleet with ease
                  </p>
                </div>
              </div>
              
             
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-3 group">
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
              <span>Add New Car</span>
            </button>
          </div>
        </div>

        {/* Enhanced Add New Car Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Add New Car</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Car Name
                </label>
                <input
                  type="text"
                  value={newCar.name}
                  onChange={(e) =>
                    setNewCar({ ...newCar, name: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="BMW X3"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Brand
                </label>
                <input
                  type="text"
                  value={newCar.brand}
                  onChange={(e) =>
                    setNewCar({ ...newCar, brand: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="BMW"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Type
                </label>
                <select
                  value={newCar.type}
                  onChange={(e) =>
                    setNewCar({ ...newCar, type: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select Type</option>
                  <option value="SUV">SUV</option>
                  <option value="Sport">Sport</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Fuel
                </label>
                <input
                  type="text"
                  value={newCar.fuel}
                  onChange={(e) =>
                    setNewCar({ ...newCar, fuel: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="70L"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Transmission
                </label>
                <select
                  value={newCar.transmission}
                  onChange={(e) =>
                    setNewCar({ ...newCar, transmission: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Capacity
                </label>
                <select
                  value={newCar.capacity}
                  onChange={(e) =>
                    setNewCar({ ...newCar, capacity: Number(e.target.value) })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value={2}>2 Person</option>
                  <option value={4}>4 Person</option>
                  <option value={6}>6 Person</option>
                  <option value={8}>8 Person</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Price per Day ($)
                </label>
                <input
                  type="number"
                  value={newCar.price}
                  onChange={(e) =>
                    setNewCar({ ...newCar, price: Number(e.target.value) })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="99"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  value={newCar.originalPrice}
                  onChange={(e) =>
                    setNewCar({
                      ...newCar,
                      originalPrice: Number(e.target.value),
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="120"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Availability Status
                </label>
                <select
                  value={newCar.availabilityStatus}
                  onChange={(e) =>
                    setNewCar({
                      ...newCar,
                      availabilityStatus: e.target.value as AvailabilityStatus,
                      isAvailable: e.target.value === "available",
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Current Location
                </label>
                <select
                  value={newCar.currentLocation}
                  onChange={(e) =>
                    setNewCar({ ...newCar, currentLocation: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-center space-x-8 py-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newCar.isRecommended}
                    onChange={(e) =>
                      setNewCar({ ...newCar, isRecommended: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Recommended</span>
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newCar.isFavorite}
                    onChange={(e) =>
                      setNewCar({ ...newCar, isFavorite: e.target.checked })
                    }
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Popular</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Image Management */}
            <div className="col-span-full mt-6">
              <ImageManager
                images={newCar.images}
                imagePublicIds={newCar.imagePublicIds}
                onImagesChange={(images, publicIds) => {
                  setNewCar({
                    ...newCar,
                    images,
                    imagePublicIds: publicIds,
                    image: images[0] || "/cars/placeholder.svg",
                  });
                }}
                maxImages={4}
              />
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 text-slate-600 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all font-medium">
                Cancel
              </button>
              <button
                onClick={addNewCar}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg">
                Add Car
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search cars by name, brand, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-500" />
              <div className="flex flex-wrap gap-2">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <button
                    key={status}
                    onClick={() =>
                      setFilter(status as "all" | AvailabilityStatus)
                    }
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      filter === status
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Cars Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredCars.map((car) => (
            <CarManagementCard
              key={car.id}
              car={car}
              locations={locations}
              onUpdate={updateCarAvailability}
              onDelete={deleteCar}
              saving={saving === car.id}
            />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 bg-slate-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Car className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No cars found</h3>
            <p className="text-slate-500">
              No cars match your current search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced individual car management card component
function CarManagementCard({
  car,
  locations,
  onUpdate,
  onDelete,
  saving,
}: {
  car: CarType;
  locations: Location[];
  onUpdate: (carId: string, updates: Partial<CarType>) => void;
  onDelete: (carId: string) => void;
  saving: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(car);
console.log(car,"car******")
  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case "available":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rented":
        return <Car className="w-5 h-5 text-red-600" />;
      case "maintenance":
        return <Settings className="w-5 h-5 text-yellow-600" />;
      case "reserved":
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-600" />;
    }
  };

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case "available":
        return "bg-green-50 text-green-700 border-green-200 shadow-green-100";
      case "rented":
        return "bg-red-50 text-red-700 border-red-200 shadow-red-100";
      case "maintenance":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 shadow-yellow-100";
      case "reserved":
        return "bg-blue-50 text-blue-700 border-blue-200 shadow-blue-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 shadow-slate-100";
    }
  };

  const handleSave = () => {
    onUpdate(car.id, {
      ...editForm,
      isAvailable: editForm.availabilityStatus === "available",
    });
    setIsEditing(false);
  };

  const handleQuickStatusUpdate = (status: AvailabilityStatus) => {
    onUpdate(car.id, {
      availabilityStatus: status,
      isAvailable: status === "available",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden">
      <div className="p-8">
        <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
        <img
              src={car.images?.[0] || car.image}
              alt={car.name}
              className="w-full lg:w-48 h-36 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
            />
          {/* Enhanced Car Details */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={editForm.brand}
                    onChange={(e) =>
                      setEditForm({ ...editForm, brand: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Type
                  </label>
                  <select
                    value={editForm.type}
                    onChange={(e) =>
                      setEditForm({ ...editForm, type: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="SUV">SUV</option>
                    <option value="Sport">Sport</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: Number(e.target.value) })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Status
                  </label>
                  <select
                    value={editForm.availabilityStatus}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        availabilityStatus: e.target.value as AvailabilityStatus,
                        isAvailable: e.target.value === "available",
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Location
                  </label>
                  <select
                    value={editForm.currentLocation || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        currentLocation: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image Management in Edit Mode */}
                <div className="col-span-full mt-4">
                  <ImageManager
                    images={editForm.images || [editForm.image]}
                    imagePublicIds={editForm.imagePublicIds || []}
                    onImagesChange={(images, publicIds) => {
                      setEditForm({
                        ...editForm,
                        images,
                        imagePublicIds: publicIds,
                        image: images[0] || "/cars/placeholder.svg",
                      });
                    }}
                    maxImages={4}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {car.name}
                      </h3>
                      <div className="flex space-x-2">
                        {car.isRecommended && (
                          <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                            <Award className="w-3 h-3" />
                            <span>Recommended</span>
                          </div>
                        )}
                        {car.isFavorite && (
                          <div className="flex items-center space-x-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200">
                            <Star className="w-3 h-3" />
                            <span>Popular</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-lg text-slate-600 font-medium">{car.brand} • {car.type}</p>
                  </div>
                  
                  <div
                    className={`flex items-center px-4 py-2 rounded-xl border text-sm font-semibold shadow-sm ${getStatusColor(
                      car.availabilityStatus
                    )}`}>
                    {getStatusIcon(car.availabilityStatus)}
                    <span className="ml-2 capitalize">
                      {car.availabilityStatus}
                    </span>
                  </div>
                </div>

                {/* Enhanced Car Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <Fuel className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Fuel</p>
                      <p className="text-sm font-bold text-slate-900">{car.fuel}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <Settings2 className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Transmission</p>
                      <p className="text-sm font-bold text-slate-900">{car.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <Users className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Capacity</p>
                      <p className="text-sm font-bold text-slate-900">{car.capacity} Person</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    
                    <div>
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Price/Day</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-bold text-green-700">${car.price}</p>
                        {car.originalPrice && car.originalPrice > car.price && (
                          <p className="text-xs text-slate-500 line-through">${car.originalPrice}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Info */}
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Current Location</p>
                    {car.currentLocation ? (
                      <p className="text-sm font-bold text-blue-900">
                        {locations.find((loc) => loc.id === car.currentLocation)?.name || "Unknown Location"}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-500 italic">Not assigned</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Actions */}
          <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3 flex-shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-green-700 hover:to-green-800 disabled:from-slate-400 disabled:to-slate-500 transition-all shadow-lg flex items-center space-x-2 min-w-[120px] justify-center">
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm(car);
                  }}
                  className="bg-slate-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-all shadow-lg min-w-[120px]">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center space-x-2 min-w-[120px] justify-center group">
                  <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Edit</span>
                </button>

                {/* Enhanced Quick Status Updates */}
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                  <button
                    onClick={() => handleQuickStatusUpdate("available")}
                    disabled={car.availabilityStatus === "available" || saving}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:from-green-700 hover:to-green-800 disabled:from-slate-300 disabled:to-slate-400 transition-all shadow-sm min-w-[100px]">
                    Available
                  </button>
                  <button
                    onClick={() => handleQuickStatusUpdate("maintenance")}
                    disabled={car.availabilityStatus === "maintenance" || saving}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:from-yellow-700 hover:to-yellow-800 disabled:from-slate-300 disabled:to-slate-400 transition-all shadow-sm min-w-[100px]">
                    Maintenance
                  </button>
                  <button
                    onClick={() => handleQuickStatusUpdate("rented")}
                    disabled={car.availabilityStatus === "rented" || saving}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:from-red-700 hover:to-red-800 disabled:from-slate-300 disabled:to-slate-400 transition-all shadow-sm min-w-[100px]">
                    Rented
                  </button>
                </div>

                <button
                  onClick={() => onDelete(car.id)}
                  disabled={saving}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-red-700 hover:to-red-800 disabled:from-slate-400 disabled:to-slate-500 transition-all shadow-lg flex items-center space-x-2 min-w-[120px] justify-center group">
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}