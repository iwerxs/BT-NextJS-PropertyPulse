"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  // console.log("addProperty action");
  // console.log(formData.get("name"));
  // connect to db
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("user id required");
    //Nextjs provides an Error Page
  }
  // de-structure and get userId from sessionUser
  const { userId } = sessionUser;
  // Access all values from amenities and images with an array of the image names
  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image) => images.name !== "");
  //get image objects; do need to map over images to create an array.
  // .map((image) => images.name);
  console.log(images);

  const propertyData = {
    //connect property to an Owner
    owner: userId,
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
    // images,
  };
  console.log(propertyData);
  //empty array of image URLs
  const imageUrls = [];
  //for-of: loop over image files and convert to base64
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    //convert to base64
    const imageBase64 = imageData.toString("base64");
    //make request to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: "properpulse" }
    );
    //add images to the array
    imageUrls.push(result.secure_url);
  }
  //add images to the propertyData Object from the imageUrl
  propertyData.images = imageUrls;

  //connect Property model with propertyData to a newProperty
  const newProperty = new Property(propertyData);
  //call save method on newProperty to save to the DB
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
