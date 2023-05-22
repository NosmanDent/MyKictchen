import { supabase } from "./supabaseClient";

async function getProductData(id) {
  let { data: productData, error } = await supabase
    .from("kitchen")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Error fetching product data:", error.message);
    return undefined;
  }

  if (!productData) {
    console.log("Product data does not exist for ID: " + id);
    return undefined;
  }

  return productData;
}

export { getProductData };
