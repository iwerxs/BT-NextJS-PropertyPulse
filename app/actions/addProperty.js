"use server";

async function addProperty(formData) {
  // console.log("addProperty action");
  // console.log(formData.get("name"));
  // Access all values from amenities and images with an array of the image names
  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image) => images.name !== "")
    .map((image) => images.name);
  console.log(images);

  const propertyData = {
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    images,
  };
  console.log(propertyData);
}

export default addProperty;
