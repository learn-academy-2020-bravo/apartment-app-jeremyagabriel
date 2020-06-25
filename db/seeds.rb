apartments = [
  {
    street_number: "123 Rosewood Ave",
    city: "Los Angeles",
    state: "CA",
    zip: "90101",
    country: "USA",
    building_manager: "Lucy Davidson",
    phone: "818-345-6789",
    hours: "9am-5pm PST",
    description: "Two bed, two bath, 1100sqft, laundry in unit. No pets.",
    image_url: "https://media.graytvinc.com/images/wcjb_apartment-living-room.jpg"
  },
  {
    street_number: "456 Alameda Ave",
    city: "San Diego",
    state: "CA",
    zip: "92103",
    country: "USA",
    building_manager: "Joe Smith",
    phone: "732-345-6789",
    hours: "9am-5pm PST",
    description: "Two bed, two bath, 1200 sqft, laundry in unit. Cats allowed.",
    image_url: "https://images.rentals.ca/property-pictures/medium/red-deer-ab/279104/mid-rise-apartment-kitchen-natural-light-carpet-kitchen-island-1471984.jpg"
  }
]

apartments.each do |attributes|
   Apartment.create attributes
end
