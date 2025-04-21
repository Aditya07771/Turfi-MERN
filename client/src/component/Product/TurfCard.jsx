 {/* Page Header */}
        <div className="pt-24 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Book Your Turf
          </h1>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search turfs by name, location, or category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="absolute right-3 top-3 text-gray-400">🔍</span>
          </div>

          {/* Filter Button for Mobile */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Filters
          </button>
        </div>