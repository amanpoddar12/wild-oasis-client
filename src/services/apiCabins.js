import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function CreateCabin(newCabins) {
  const imageName = `${Math.round(Math.random())}-${
    newCabins.image.name
  }`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(imagePath);
  // https://mywnvryfrakhcxxolupn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabins, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be Created ");
  }
  // const avatarFile = event.target.files[0]
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .update(imageName, newCabins.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted ");
  }
  return data;
}
