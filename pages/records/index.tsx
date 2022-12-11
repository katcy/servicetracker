import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

import supabase from "../../services/dbConfig";
import { logout } from "../../services/index";

import { VehicleRecords } from "../../types/types";

const SERVICE_PARAMS = {
  odometer: "Odometer",
  serviceDate: "Service Date",
  engineOilChanged: "Engine Oil Changed",
  oilFilterChanged: "Oil Filter Changed",
  cabinAirFilterChanged: "Cabin Air Filter Changed",
  airFilterChanged: "Air Filter Changed",
  gearboxOilChanged: "Gearbox Oil Changed",
  cleanedBrakePads: "Cleaned Brake Pads",
  brakePadsChanged: "Brake Pads Changed",
  dieselFilterChanged: "Diesel Filter Changed",
  wheelAlignmentDone: "Wheel Alignment",
};

const recordTypes: Record<string, (val: string | boolean) => JSX.Element> = {
  boolean: (checked) => (
    <input type="checkbox" defaultChecked={checked as boolean} />
  ),
  string: (servicedDate) => <span>{servicedDate}</span>,
  number: (odometer) => <span>{odometer}</span>,
};

const Records = () => {
  const router = useRouter();
  const [vehicleRecords, setVehicleRecords] = useState<VehicleRecords[]>([]);
  const [refresh, setRefresh] = useState(false);

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("servicehistory")
      .select(`*,vehicle_number(nick_name,vehicle_number)`);
    setVehicleRecords(data as VehicleRecords[]);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      <main className="vw-100 mx-auto container">
        <div className="row justify-content-end">
          <div className="col-1">
            <button
              className="btn btn-lg col align-self-end"
              onClick={() => {
                logout().then(() => {
                  router.push("/");
                });
              }}
            >
              <i className="bi bi-box-arrow-right "></i>
            </button>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            router.push("/new");
          }}
        >
          Add New Vehicle
        </button>
        {(vehicleRecords || []).map(
          (
            {
              id,
              lastUpdated,
              serviceRecords,
              vehicle_number: { nick_name, vehicle_number },
            },
            vehicleIndex
          ) => {
            const serviceParams = Object.values(SERVICE_PARAMS);
            const lastServicedDate = serviceRecords?.[0]?.serviceDate || "";
            return (
              <article
                className={classnames(
                  "card w-auto p-2 mb-4",
                  "mt-4",
                  "col-sm-12 col-md-6"
                )}
                key={id}
              >
                <div className="d-flex justify-content-evenly">
                  <h3 className="card-title">
                    {nick_name} - {vehicle_number}
                    <span className="ms-4 fst-italic text-secondary">
                      Last Serviced: {lastServicedDate}
                    </span>
                  </h3>
                  <Link
                    className="btn btn-primary"
                    href={`/update-record/${vehicle_number}`}
                  >
                    Add Service
                  </Link>
                </div>
                <div className="card-body">
                  {/* {console.log(serviceHistory)} */}
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        {serviceParams.map((param) => (
                          <th key={param}>{param}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {serviceRecords.map((record, recordIndex) => (
                        <tr key={recordIndex}>
                          {Object.values(record).map((rec, recIndex) => (
                            <td key={recIndex}>
                              {recordTypes[typeof rec](rec)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            );
          }
        )}
      </main>
    </>
  );
};

export default Records;
