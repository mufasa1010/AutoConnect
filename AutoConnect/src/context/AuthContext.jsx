import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function: Fetch user profile from the database USER-ACCOUNTS table
  const fetchUserProfile = async (authUser) => {
    try {
      // Fetch details from the USER-ACCOUNTS table using .single() for a single object response
      const { data, error } = await supabase
        .from("user-accounts")
        .select("*")
        .eq("user_id", authUser.id)
        .single();

      if (error) {
        console.warn("Could not fetch database profile, falling back to auth metadata:", error.message);
        // Fallback: If database profile doesn't exist yet, populate user from metadata
        setUser({
          user_id: authUser.id,
          email: authUser.email,
          full_name: authUser.user_metadata?.full_name || authUser.email,
          phone_number: authUser.user_metadata?.phone_number || "",
          account_type: authUser.user_metadata?.account_type || "owner",
          avatar: authUser.user_metadata?.avatar || `https://i.pravatar.cc/150?img=33`,
        });
      } else {
        // Success: Combine auth user session with database record
        setUser({
          user_id: data.user_id,
          email: authUser.email,
          full_name: data.full_name,
          phone_number: data.phone_number,
          account_type: data.account_type,
          avatar: authUser.user_metadata?.avatar || `https://i.pravatar.cc/150?img=33`,
        });
      }
    } catch (e) {
      console.error("Failed to resolve user profile details:", e);
    }
  };

  useEffect(() => {
    // 1. Check current session on mount
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking session:", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // 2. Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login handler: Accepts email and password
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || "An unexpected error occurred during login." };
    }
  };

  // Sign up handler: Accepts matching form elements (email, phone_number, password, account_type, full_name)
  const signup = async (email, phone_number, password, account_type, full_name, avatarFile = null) => {
    try {
      // Formats the phone number to clean presentation
      let cleanPhone = phone_number.replace(/[^\d+]/g, "");
      if (!cleanPhone.startsWith("+") && !cleanPhone.startsWith("237")) {
        cleanPhone = `+237${cleanPhone}`;
      }

      // Step 1: Sign up user inside Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            phone_number: cleanPhone,
            account_type,
          }
        }
      });

      if (signUpError) {
        return { success: false, error: signUpError.message };
      }

      const authUserId = signUpData.user.id;
      // Default placeholder avatar
      let finalAvatarUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;

      // Step 2: Upload avatar image to Supabase Storage bucket 'avatars' (if provided)
      if (avatarFile) {
        try {
          const fileExt = avatarFile.name.split(".").pop();
          const fileName = `${authUserId}_${Date.now()}.${fileExt}`;
          const filePath = `public/${fileName}`; 

          const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, avatarFile, {
              cacheControl: "3600",
              upsert: true,
            });

          if (uploadError) {
            console.error("Storage upload failed, falling back to default avatar:", uploadError.message);
          } else {
            // Get public URL for storage upload
            const { data: { publicUrl } } = supabase.storage
              .from("avatars")
              .getPublicUrl(filePath);
            
            finalAvatarUrl = publicUrl;
          }
        } catch (storageErr) {
          console.error("Failed upload workflow:", storageErr);
        }
      }

      // Step 3: Update Auth user metadata to include the generated or uploaded avatar url
      await supabase.auth.updateUser({
        data: { avatar: finalAvatarUrl }
      });

      // Step 4: Insert row into USER-ACCOUNTS table
      const { error: profileError } = await supabase
        .from("user-accounts")
        .insert({
          user_id: authUserId,
          full_name,
          phone_number: cleanPhone,
          account_type,
        });

      if (profileError) {
        console.error("Failed db profile write:", profileError.message);
        return { success: false, error: `Account created in Auth, but profile write failed: ${profileError.message}` };
      }
      console.log(email)
      // Step 5: If user is a mechanic, initialize row in MECHANIC-PROFILES table
      if (account_type === "mechanic") {
        const { error: mechanicError } = await supabase
          .from("mechanic-profiles")
          .insert({
            mechanic_id: authUserId,
            specialty_type: "General Maintenance",
            active_or_off_duty: "active",
            location_coordinates: "4.0503, 9.7679", // Cameroon Default
          });
        
        if (mechanicError) {
          console.error("Failed db mechanic profile write:", mechanicError.message);
        }
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || "An unexpected error occurred during signup." };
    }
  };

  // Sign out handler
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}