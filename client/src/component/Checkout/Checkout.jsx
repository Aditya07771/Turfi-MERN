// TurfFilter.js
import { useState, useEffect } from "react";
import { fetchNearbyTurfs } from "./googleMapsAPI";
import BookingStepper from "./BookingStepper.jsx";  
import FilterSlideBar from "./FilterSlideBar.jsx";
import TurfCard from "./TurfCard.jsx";

const Checkout = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [turfs, setTurfs] = useState([]);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [isBooking, setIsBooking] = useState(false);
  
  useEffect(() => {
    fetchNearbyTurfs().then((data) => setTurfs(data));
  }, []);

  const filteredTurfs = selectedCategory === "All" 
    ? turfs 
    : turfs.filter(turf => turf.category === selectedCategory);

  const sortedTurfs = [...filteredTurfs].sort((a, b) => 
    sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Find Your Perfect Turf</h1>
      {!isBooking ? (
        <>
          <input type="text" placeholder="Search for turfs..." className="w-full p-3 border rounded-lg mb-6" />
          <div className="flex gap-6">
            <FilterSlideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setSortOrder={setSortOrder} />
            <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTurfs.length > 0 ? (
                sortedTurfs.map((turf) => <TurfCard key={turf.id} turf={turf} onProceed={() => setIsBooking(true)} />)
              ) : (
                <p className="text-gray-500">No turfs found. Try adjusting filters.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <BookingStepper />
      )}
    </div>
  );
};

export default Checkout;
