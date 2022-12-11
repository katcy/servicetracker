import { Dispatch, SetStateAction } from "react";

export interface IServiceType {
  odometer: Number;
  serviceDate: string;
  engineOilChanged: boolean;
  oilFilterChanged: boolean;
  cabinAirFilterChanged: boolean;
  airFilterChanged: boolean;
  gearboxOilChanged: boolean;
  cleanedBrakePads: boolean;
  brakePadsChanged: boolean;
  dieselFilterChanged: boolean;
  wheelAlignmentDone: boolean;
}

export type ServiceTypes = Record<
  string,
  { displayName: string; type: string }
>;

export type ServiceTypesRecord = Array<{
  id: number;
  service_types: ServiceTypes;
}>;

export type ServiceFormFieldProps = {
  serviceType: string;
  displayName: string;
  formData: IServiceType;
  onChange: Dispatch<SetStateAction<IServiceType>>;
};

export type ServiceRecord = {
  odometer: string;
  serviceDate: string;
  airFilterChanged: boolean;
  brakePadsChanged: boolean;
  cleanedBrakePads: boolean;
  engineOilChanged: boolean;
  oilFilterChanged: boolean;
  gearboxOilChanged: boolean;
  wheelAlignmentDone: boolean;
  dieselFilterChanged: boolean;
  cabinAirFilterChanged: boolean;
};

export type ServiceRecords = ServiceRecord[];

export type VehicleRecords = {
  id: number;
  vehicle_number: { vehicle_number: string; nick_name: string };
  serviceRecords: ServiceRecords;
  lastUpdated: string;
  user_id: string;
};
