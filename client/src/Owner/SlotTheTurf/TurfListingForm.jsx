import React, { useState, useRef, useEffect } from "react";
import { Camera, Plus, Trash2, MapPin, Image, Check } from "lucide-react";
import { 
  GoogleMap, 
  Marker, 
  LoadScript, 
  StandaloneSearchBox 
} from "@react-google-maps/api";

const TurfListingForm = () => {
  const [formData, setFormData] = useState({
    turfName: "",
    description: "",
    amenities: [],
    sportsAvailable: [],
    groundType: "",

    startTime: "",
    endTime: "",

    country: "",
    city: "",
    streetAddress: "",
    latitude: null,
    longitude: null,

    pricePerHour: "",
    maxPlayers: "",

    contactNumber: "",
    email: "",
    website: "",

    venueRules: [],
  });

  const [images, setImages] = useState([]);
  const [mapPosition, setMapPosition] = useState({
    lat: 20.5937,
    lng: 78.9629,
  }); // Default to India
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const imageInputRef = useRef(null);

  const amenitiesList = [
    "Parking",
    "Drinking Water",
    "First Aid",
    "Change Room",
    "Shower",
  ];

  const sportsAvailableList = [
    "Badminton",
    "Cricket",
    "Football",
    "Tennis",
    "Basketball",
  ];

  const groundTypeOptions = [
    "Artificial Turf",
    "Natural Grass",
    "Synthetic Grass",
    "Hard Court",
    "Clay Court",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenitiesChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addVenueRule = () => {
    setFormData((prev) => ({
      ...prev,
      venueRules: [...prev.venueRules, ""],
    }));
  };

  const updateVenueRule = (index, value) => {
    const newRules = [...formData.venueRules];
    newRules[index] = value;
    setFormData((prev) => ({
      ...prev,
      venueRules: newRules,
    }));
  };

  const removeVenueRule = (index) => {
    const newRules = formData.venueRules.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      venueRules: newRules,
    }));
  };

  const handleMultiSelectChange = (e, field) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSportsChange = (sport) => {
    setFormData((prev) => ({
      ...prev,
      sportsAvailable: prev.sportsAvailable.includes(sport)
        ? prev.sportsAvailable.filter((s) => s !== sport)
        : [...prev.sportsAvailable, sport],
    }));
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    
    setMapPosition({ lat, lng });
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));

    // Reverse geocode to get address details
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;
        const countryComponent = addressComponents.find(component => 
          component.types.includes("country")
        );
        const cityComponent = addressComponents.find(component => 
          component.types.includes("locality") || component.types.includes("administrative_area_level_1")
        );
        const streetComponent = addressComponents.find(component => 
          component.types.includes("street_address") || component.types.includes("route")
        );

        setFormData((prev) => ({
          ...prev,
          country: countryComponent ? countryComponent.long_name : "",
          city: cityComponent ? cityComponent.long_name : "",
          streetAddress: streetComponent ? streetComponent.long_name : "",
        }));
      }
    });
  };

  const handlePlaceSelect = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = place.geometry.location;
      const lat = location.lat();
      const lng = location.lng();

      setMapPosition({ lat, lng });
      setFormData((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        country: place.address_components.find(component => 
          component.types.includes("country")
        )?.long_name || "",
        city: place.address_components.find(component => 
          component.types.includes("locality") || component.types.includes("administrative_area_level_1")
        )?.long_name || "",
        streetAddress: place.formatted_address || "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a complete form data object with all details
    const completeFormData = {
      ...formData,
      images: images, // Add the image URLs
      location: {
        latitude: formData.latitude,
        longitude: formData.longitude,
        country: formData.country,
        city: formData.city,
        streetAddress: formData.streetAddress
      }
    };

    // Log the complete form data
    console.log('Form Submission Details:', {
      basicInfo: {
        turfName: completeFormData.turfName,
        description: completeFormData.description,
        groundType: completeFormData.groundType
      },
      sportsAndAmenities: {
        sportsAvailable: completeFormData.sportsAvailable,
        amenities: completeFormData.amenities
      },
      timingAndPricing: {
        startTime: completeFormData.startTime,
        endTime: completeFormData.endTime,
        pricePerHour: completeFormData.pricePerHour,
        maxPlayers: completeFormData.maxPlayers
      },
      contactInfo: {
        contactNumber: completeFormData.contactNumber,
        email: completeFormData.email,
        website: completeFormData.website
      },
      location: completeFormData.location,
      venueRules: completeFormData.venueRules,
      images: completeFormData.images
    });

    // Here you can add your API call to submit the form
    // For example:
    // submitFormData(completeFormData);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-950 to-sky-900 py-20">
      <div className="max-w-full mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 px-10 py-12">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-800 text-white p-8 text-center rounded-lg">
          <h1 className="text-4xl font-bold">List Your Turf</h1>
          <p className="mt-2 text-indigo-100">
            Share your sports venue with the world
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-4 bg-white rounded-lg p-6 border border-gray-200">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Basic Information
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Turf Name
                </label>
                <input
                  type="text"
                  name="turfName"
                  value={formData.turfName}
                  onChange={handleInputChange}
                  placeholder="Enter turf name"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of your turf"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  rows="2"
                />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6 bg-white rounded-lg p-6 border border-gray-200">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Details
              </h2>
            </div>

            {/* Sports Available */}
            <div className="pt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Sports Available
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {sportsAvailableList.map((sport) => (
                  <label
                    key={sport}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition border-2 hover:border-emerald-500 hover:text-emerald-700 ${
                      formData.sportsAvailable.includes(sport)
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                        : "bg-gray-50 border-gray-200 text-gray-600"
                    }`}
                    onClick={() => handleSportsChange(sport)}
                  >
                    <div
                      className={`w-5 h-5 mr-3 rounded flex items-center justify-center ${
                        formData.sportsAvailable.includes(sport)
                          ? "bg-emerald-500"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {formData.sportsAvailable.includes(sport) && (
                        <Check size={16} className="text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{sport}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ground Type */}
            <div className="pt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Ground Type
              </label>
              <select
                name="groundType"
                value={formData.groundType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              >
                <option value="">Select Ground Type</option>
                {groundTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Timing & Pricing */}
            <div className="space-y-4 bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Timing & Pricing
              </h3>
              <div className="grid md:grid-cols-4 gap-6 pt-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Price Per Hour
                  </label>
                  <input
                    type="number"
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleInputChange}
                    placeholder="Price"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Max Players
                  </label>
                  <input
                    type="number"
                    name="maxPlayers"
                    value={formData.maxPlayers}
                    onChange={handleInputChange}
                    placeholder="Max players"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Contact Information
              </h3>
              <div className="grid md:grid-cols-3 gap-6 pt-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Contact number"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="Website URL"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4 bg-white rounded-lg p-6 border border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                  Location Information
                </h2>
              </div>
              
              <div className="space-y-6 pt-4">
                <LoadScript
                  googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                  libraries={["places"]}
                >
                  {/* Search Box */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <StandaloneSearchBox
                      onLoad={(ref) => (searchBoxRef.current = ref)}
                      onPlacesChanged={handlePlaceSelect}
                    >
                      <input
                        type="text"
                        placeholder="Search for location"
                        className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      />
                    </StandaloneSearchBox>
                  </div>
                  
                  {/* Map */}
                  <div className="h-[400px] w-full rounded-lg overflow-hidden border-2 border-gray-100">
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={mapPosition}
                      zoom={8}
                      onClick={handleMapClick}
                      onLoad={(map) => (mapRef.current = map)}
                    >
                      {mapPosition.lat && mapPosition.lng && (
                        <Marker 
                          position={{ 
                            lat: mapPosition.lat, 
                            lng: mapPosition.lng 
                          }} 
                        />
                      )}
                    </GoogleMap>
                  </div>

                  {/* Address Fields */}
                  <div className="grid md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      />
                    </div>
                  </div>
                </LoadScript>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="space-y-4 bg-white rounded-lg p-6 border border-gray-200">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Amenities
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition border-2 hover:border-emerald-500 hover:text-emerald-700 ${
                    formData.amenities.includes(amenity)
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                  onClick={() => handleAmenitiesChange(amenity)}
                >
                  <div
                    className={`w-5 h-5 mr-3 rounded flex items-center justify-center ${
                      formData.amenities.includes(amenity)
                        ? "bg-emerald-500"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    {formData.amenities.includes(amenity) && (
                      <Check size={16} className="text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="space-y-4 bg-white rounded-lg p-6 border border-gray-200">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Venue Images
              </h2>
            </div>
            <div className="pt-4">
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => imageInputRef.current.click()}
                  className="flex items-center text-white px-4 py-2 rounded-lg bg-gradient-to-r from-teal-700 to-emerald-800 hover:from-teal-800 hover:to-emerald-900 transition"
                >
                  <Image className="mr-2" size={20} /> Upload Images
                </button>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Venue ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Venue Rules Section */}
          <div className="space-y-4 bg-white rounded-lg p-6 border border-gray-200">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-100">
                Venue Rules
              </h2>
            </div>
            <div className="space-y-3 pt-4">
              {formData.venueRules.map((rule, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => updateVenueRule(index, e.target.value)}
                    placeholder="Enter venue rule"
                    className="flex-grow p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                  <button
                    onClick={() => removeVenueRule(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button
                onClick={addVenueRule}
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <Plus size={20} />
                Add Rules
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-teal-700 to-emerald-800 hover:from-teal-800 hover:to-emerald-900 text-white py-4 rounded-lg font-medium text-lg shadow-lg transition"
            >
              List Your Turf
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TurfListingForm;
