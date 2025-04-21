import React, { useState, useMemo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TrufImage from "../../assets/background2.webp";
import { useNavigate } from "react-router-dom";

// Mock data for turfs (replace with your actual data)
const turfData = [
  {
    id: 1,
    name: 'Green Field Sports',
      image: TrufImage,
    location: "City Center",
    category: "Football",
    price: 1200,
    rating: 4.5,
    available: true,
    facilities: ["Floodlights", "Changing Rooms", "Parking"],
    
  },
  {
    id: 2,
    name: 'Urban Playgrounds',
    image: 'https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1719570263115.webp&w=640&q=75',
    location: "Downtown",
    category: "Cricket",
    price: 1500,
    rating: 4.8,
    available: true,
    facilities: ["Professional Pitch", "Seating", "Coaching"],
    
  },
  {
    id: 3,
    name: 'Arena Sports Complex',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLCrxVr7YkF7UWywEcnMyCzx-2Zr2jfDz4LAWn9jshRDGbYRU29D8mLeLDaZiMEgjKaw&usqp=CAU',
    location: "Riverside Area",
    category: "Multiple",
    price: 1000,
    rating: 4.2,
    available: false,
    facilities: ["Open Ground", "Basic Amenities"],
  },
  {
    id: 4,
    name: "Sunset Sports Ground",
    image: 'https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1732299669876.webp&w=828&q=75',
    location: "Suburban Area",
    category: "Football",
    price: 800,
    rating: 4.0,
    available: true,
    facilities: ["Community Ground", "Basic Setup"],
    
  },
  {
    id: 4,
    name: 'Olympic Sports Arena',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA_uYuSdHX4UTSrj6QKKzh3xKbRPfDO3wDbQ&s',
    location: "Suburban Area",
    category: "Football",
    price: 800,
    rating: 4.0,
    available: true,
    facilities: ["Community Ground", "Basic Setup"],
    
  },
];

// Price Range Filters
export const singleFilters = [
  {
    id: "price",
    name: "Price Range",
    options: [
      { value: "0-500", label: "₹0 - ₹500" },
      { value: "500-1000", label: "₹500 - ₹1000" },
      { value: "1000-2000", label: "₹1000 - ₹2000" },
      { value: "2000+", label: "₹2000+" }
    ]
  }
];

// Other filter configurations
const filters = [
  {
    id: "category",
    name: "Sports Category",
    options: [
      { value: "football", label: "Football" },
      { value: "cricket", label: "Cricket" },
      { value: "multiple", label: "Multiple Sports" },
    ],
  },
  {
    id: "availability",
    name: "Availability",
    options: [
      { value: "available", label: "Available Now" },
      { value: "booked", label: "Booked" },
    ],
  },
];

// Turf Card Component (Horizontal Layout)
const TurfCard = ({ turf }) => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-white rounded-xl shadow-lg overflow-hidden m-4 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <img
        src={turf.image}
        alt={turf.name}
        className="w-64 h-56 object-cover"
      />
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-green-800">{turf.name}</h2>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                turf.available
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {turf.available ? "Available" : "Booked"}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{turf.location}</p>

          <div className="mt-3">
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-gray-600">{turf.rating}</span>
            </div>

            <div className="flex items-center mt-2">
              <span className="text-gray-600 font-medium">Facilities:</span>
              <div className="ml-2 flex space-x-2">
                {turf.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-green-700 font-bold text-xl">
            ₹{turf.price}/hour
          </div>
          <button
          // onClick={() => navigate(`/turf-details/${turf.id}`)}
          onClick={() => navigate('/turf-details')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            disabled={!turf.available}
          >
            {turf.available ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TurfBookingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");
  const itemsPerPage = 3;

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Filter and search logic
  const filteredTurfs = useMemo(() => {
    return turfData.filter((turf) => {
      // Search filter
      const matchesSearch =
        turf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        turf.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        turf.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Price range filter
      const matchesPriceRange =
        turf.price >= priceRange[0] && turf.price <= priceRange[1];

      // Single Price Range Filter
      const matchesPriceSingleFilter = selectedFilters.price ? 
        selectedFilters.price.some(priceFilter => {
          switch (priceFilter) {
            case "0-500": return turf.price <= 500;
            case "500-1000": return turf.price > 500 && turf.price <= 1000;
            case "1000-2000": return turf.price > 1000 && turf.price <= 2000;
            case "2000+": return turf.price > 2000;
            default: return true;
          }
        }) : true;

      // Category and availability filters
      const matchesFilters = Object.entries(selectedFilters).every(
        ([filterId, selectedValues]) => {
          if (filterId === "price") return true; // Already handled above
          if (selectedValues.length === 0) return true;

          switch (filterId) {
            case "category":
              return selectedValues.includes(turf.category.toLowerCase());
            case "availability":
              return selectedValues.includes(
                turf.available ? "available" : "booked"
              );
            default:
              return true;
          }
        }
      );

      return matchesSearch && matchesFilters && matchesPriceRange && matchesPriceSingleFilter;
    }).sort((a, b) => {
      // Sorting logic
      switch (sortOrder) {
        case "low-to-high":
          return a.price - b.price;
        case "high-to-low":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedFilters, priceRange, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredTurfs.length / itemsPerPage);
  const paginatedTurfs = filteredTurfs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle filter selection
  const handleFilterChange = (value, sectionId) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[sectionId] || [];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((f) => f !== value)
        : [...currentFilters, value];

      return {
        ...prev,
        [sectionId]: newFilters,
      };
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="pt-24 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Book Your Turf
          </h1>
        </div>
        <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search turfs by name, location, or category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-5"
              />
              <span className="absolute right-4 top-5 text-gray-400 text-xl">🔍</span>
            </div>

            <div className="text-2xl font-semibold tracking-tight text-gray-700 mb-3">
              <span> <FilterAltIcon/> </span>Filter
            </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Large Search Input */}
            

            {/* Sorting Dropdown */}
            <div className="mt-4">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
                Sort By Price
              </label>
              <select
                id="sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="mt-4">
              <Typography gutterBottom>Price Range (₹)</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={500}
                max={2000}
                step={100}
                color="success"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>

            {/* Single Price Range Filters */}
            {singleFilters.map((section) => (
              <div key={section.id} className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {section.name}
                </h3>
                {section.options.map((option) => (
                  <div key={option.value} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters[section.id]?.includes(
                        option.value
                      )}
                      onChange={() =>
                        handleFilterChange(option.value, section.id)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-2"
                      id={`filter-${section.id}-${option.value}`}
                    />
                    <label
                      htmlFor={`filter-${section.id}-${option.value}`}
                      className="text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            ))}

            {/* Existing Category and Availability Filters */}
            {filters.map((section) => (
              <div key={section.id} className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {section.name}
                </h3>
                {section.options.map((option) => (
                  <div key={option.value} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters[section.id]?.includes(
                        option.value
                      )}
                      onChange={() =>
                        handleFilterChange(option.value, section.id)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-2"
                      id={`filter-${section.id}-${option.value}`}
                    />
                    <label
                      htmlFor={`filter-${section.id}-${option.value}`}
                      className="text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Turf Listings */}
          <div className="lg:col-span-4">
            {paginatedTurfs.length > 0 ? (
              <div className="space-y-6">
                {paginatedTurfs.map((turf) => (
                  <TurfCard key={turf.id} turf={turf} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No turfs found matching your search and filters.
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                  color="success"
                />
              </Stack>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}