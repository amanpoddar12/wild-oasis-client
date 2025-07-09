import supabase, { supabaseUrl } from "./supabase.js";

// Check if user is admin
export const checkUserRole = async (email) => {
  // You can customize this logic - for now, checking if email contains 'admin'
  // In production, you'd want to store roles in a separate table
  const adminEmails = ['admin@wildoasis.com', 'admin@hotel.com'];
  return adminEmails.includes(email.toLowerCase()) || email.toLowerCase().includes('admin');
};

export const signup = async ({ email, password, fullName }) => {
  const isAdmin = await checkUserRole(email);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "", role: isAdmin ? 'admin' : 'guest' } },
  });
  if (error) throw new Error(error.message);
  return data;
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Login error", { cause: error });
  }

  // Add role information if not present
  if (data.user && !data.user.user_metadata.role) {
    const isAdmin = await checkUserRole(data.user.email);
    await supabase.auth.updateUser({
      data: { role: isAdmin ? 'admin' : 'guest' }
    });
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw new Error("Login error", { cause: sessionError });
  if (!session?.session) return null;

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error("Login error", { cause: userError });

  return user?.user;
};

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Login error", { cause: error });
  }
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  let updateData;
  // update password or fullName
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new error(error.message);
  if (!avatar) return data;
  //upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new error(storageError.message);
  //update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new error(error2.message);
  return updatedUser;
}
