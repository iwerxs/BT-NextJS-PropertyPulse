"use server";

async function addProperty(formData) {
  console.log("addProperty action");
  console.log(formData.get("name"));
}

export default addProperty;
