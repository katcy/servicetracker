import { PostgrestError } from "@supabase/supabase-js";
import { IServiceType } from "../types/types";
import supabase from "./dbConfig";

export const getServiceRecordsByVehicleNumber = async <T>(
  vehicleNumber: string
) => {
  const { data, error } = await supabase
    .from("servicehistory")
    .select("*")
    .eq("vehicle_number", vehicleNumber);

  const serviceRecords = data?.[0]?.serviceRecords || {};
  return { serviceRecords, error } as {
    serviceRecords: T;
    error: PostgrestError;
  };
};

export const getServiceTypes = async <T>() => {
  const { data, error } = await supabase.from("servicetypes").select("*");
  return { data, error } as { data: T; error: PostgrestError };
};

export const updateServiceRecords = async (
  updatedRecords: IServiceType[],
  vehicleNumber: string
) => {
  const { data, error } = await supabase
    .from("servicehistory")
    .update({ serviceRecords: updatedRecords })
    .eq("vehicle_number", vehicleNumber);

  return { data, error };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};

export const addNewVehicle = async (
  vehicle_number: string,
  nick_name: string
) => {
  const userInfo = JSON.parse(localStorage.getItem("supabase") || "{}");

  const { data, error } = await supabase
    .from("vehicles")
    .insert({ vehicle_number, nick_name, user_id: userInfo.id });

  return { data, error };
};

export const addEmptyServiceRecords = async (vehicle_number: string) => {
  const userInfo = JSON.parse(localStorage.getItem("supabase") || "{}");

  const { data, error } = await supabase.from("servicehistory").insert({
    vehicle_number,
    serviceRecords: [],
    user_id: userInfo.id,
  });

  return { data, error };
};
