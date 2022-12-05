import { useEffect, useState } from "react";
import Link from "next/link";
import classnames from "classnames";

import supabase from "../services/dbConfig";

/*
Misty Blue
#AEB8C4

Dark Blue
#05263B

Blue Grotto
#163B50

Slate
#9CA6B8
*/
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

const recordTypes = {
  boolean: (checked: boolean) => (
    <input type="checkbox" defaultChecked={checked} />
  ),
  string: (servicedDate: string) => <span>{servicedDate}</span>,
  number: (odometer: string) => <span>{odometer}</span>,
};

export default function Home() {
  const [vehicleRecords, setVehicleRecords] = useState<any[] | null>([]);
  const [refresh, setRefresh] = useState(false);

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("servicehistory")
      .select(`*,vehicle_number(nick_name,vehicle_number)`);
    setVehicleRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <main className="vw-100 mx-auto">
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
            const lastServicedDate = serviceRecords[0].serviceDate;
            return (
              <article
                className={classnames("card w-75 p-2 mb-4", {
                  "mt-4": vehicleIndex !== 0,
                })}
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
    </div>
  );
}
