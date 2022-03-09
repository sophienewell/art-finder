import React, { useCallback } from "react";

export default function useAPI() {
  const makeAPICall = useCallback(async (url, config) => {
    try {
      const res = await fetch(url, config);
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
      return { data: null, success: false, error: "Something went wrong." };
    }
  }, []);

  const login = useCallback(
    async (username, password) => {
      return await makeAPICall("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    [makeAPICall]
  );

  const addFave = useCallback(
    async (art) => {
      return await makeAPICall("/api/favorites/add", {
        method: "PUT",
        body: JSON.stringify(art),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    [makeAPICall]
  );

  const delFave = useCallback(
    async (art_id) => {
      return await makeAPICall(`/api/favorites/remove/${art_id}`, {
        method: "DELETE",
      });
    },
    [makeAPICall]
  );

  const favesByUserID = useCallback(async () => {
    return await makeAPICall(`/api/favorites/`, {
      method: "GET",
    });
  }, [makeAPICall]);

  const logout = useCallback(async () => {
    return await makeAPICall("/api/users/logout", { method: "GET" });
  }, [makeAPICall]);

  const verify = useCallback(async () => {
    return await makeAPICall("/api/users/verify", { method: "GET" });
  }, [makeAPICall]);

  return { login, addFave, delFave, favesByUserID, logout, verify };
}
