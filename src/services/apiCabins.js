import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function CreateEditCabin(newCabins, id) {
  const imageName = `${Math.random()}-${newCabins.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(imagePath);
  // https://mywnvryfrakhcxxolupn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  let query = supabase.from("cabins");

  if (!id) query.insert([{ ...newCabins, image: imagePath }]);
  if (id) query.update({ other_column: "otherValue" }).eq("id", id);
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be Created ");
  }
  // const avatarFile = event.target.files[0]
  //2. Upload images
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabins.image);

  //3. Delete the cabin If there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
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
