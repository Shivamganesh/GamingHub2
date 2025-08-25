import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (user) {
        const { data: userData, error } = await supabase.auth.getUser();
        if (!userData?.user || error) {
          setUser(null);
          setUsername("");
        } else {
          setUser(userData.user);
          setUsername(userData.user.user_metadata?.username || userData.user.email);
        }
      } else {
        setUser(null);
        setUsername("");
      }
      setLoading(false);
    };
    getSession();
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user;
      if (user) {
        const { data: userData, error } = await supabase.auth.getUser();
        if (!userData?.user || error) {
          setUser(null);
          setUsername("");
        } else {
          setUser(userData.user);
          setUsername(userData.user.user_metadata?.username || userData.user.email);
        }
      } else {
        setUser(null);
        setUsername("");
      }
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  return { user, username, loading };
}
