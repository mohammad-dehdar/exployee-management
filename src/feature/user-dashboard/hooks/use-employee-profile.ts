import { useCallback } from "react";
import { fetchEmployeeProfile, saveEmployeeProfile } from "../api/profile";
import type { EmployeeProfilePayload } from "../types";
import { useEmployeeProfileStore } from "../store/employee-profile.store";

export function useEmployeeProfile() {
  const {
    profile,
    isLoading,
    isSaving,
    error,
    setProfile,
    setLoading,
    setSaving,
    setError,
  } = useEmployeeProfileStore();

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEmployeeProfile();
      if (data) {
        setProfile(data);
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error("Failed to fetch employee profile:", err);
      setError("خطا در دریافت اطلاعات پروفایل");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setProfile]);

  const upsertProfile = useCallback(
    async (payload: EmployeeProfilePayload) => {
      try {
        setSaving(true);
        setError(null);
        const result = await saveEmployeeProfile(payload);
        setProfile(result.profile);
        return result;
      } catch (err) {
        console.error("Failed to save employee profile:", err);
        setError("خطا در ذخیره اطلاعات پروفایل");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [setSaving, setError, setProfile]
  );

  return {
    profile,
    isLoading,
    isSaving,
    error,
    loadProfile,
    upsertProfile,
  };
}
