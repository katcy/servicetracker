import { useEffect, useState, Dispatch, SetStateAction, FC } from "react";
import { useRouter } from "next/router";

import {
  BooleanComponent,
  NumberComponent,
  StringComponent,
  DateComponent,
} from "../../components";

import {
  IServiceType,
  ServiceTypesRecord,
  ServiceTypes,
  ServiceFormFieldProps,
} from "../../types/types";
import {
  getServiceRecordsByVehicleNumber,
  getServiceTypes,
  updateServiceRecords,
} from "../../services";

const FORM_ELEMENTS: Record<string, FC<ServiceFormFieldProps>> = {
  number: NumberComponent,
  boolean: BooleanComponent,
  string: StringComponent,
  date: DateComponent,
};

const Update = () => {
  const {
    query: { vehicleNumber },
    push,
  } = useRouter();

  const [serviceRecords, setServiceRecords] = useState<IServiceType[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceTypes>({});
  const [formData, setFormData] = useState<IServiceType>({} as IServiceType);
  const [isLoading, setIsLoading] = useState({});

  useEffect(() => {
    if (vehicleNumber) {
      setIsLoading(true);
      getServiceRecordsByVehicleNumber<IServiceType[]>(vehicleNumber as string)
        .then(({ serviceRecords }) => {
          setServiceRecords(serviceRecords);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [vehicleNumber]);

  useEffect(() => {
    setIsLoading(true);
    getServiceTypes<ServiceTypesRecord>().then(({ data, error }) => {
      const [{ service_types }] = data;
      const formDataKeys = Object.keys(service_types);
      setServiceTypes(service_types);
      let formFields = {} as Record<string, unknown>;
      formDataKeys.map((key) => {
        switch (service_types[key].type) {
          case "date": {
            formFields[key] = "";
            break;
          }
          case "number": {
            formFields[key] = "";
            break;
          }
          case "boolean": {
            formFields[key] = false;
            break;
          }
        }
      });
      setFormData(formFields as unknown as IServiceType);
      setIsLoading(false);
    });
  }, []);

  const update = () => {
    const updatedServiceRecords = [...serviceRecords, formData];
    updateServiceRecords(updatedServiceRecords, vehicleNumber as string).then(
      () => {
        push("/");
      }
    );
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <h1 className="mt-5 ms-3">Update Service Record - {vehicleNumber}</h1>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-grow bg-gradient"></div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <form className="w-50">
            <table className="table table-striped table-bordered mt-5">
              <thead className="col-form-label-lg">
                <tr>
                  <th>Service Type</th>
                  <th>Value</th>
                </tr>
              </thead>

              <tbody>
                {Object.keys(serviceTypes || {}).map((type, idx) => {
                  const { type: dataType, displayName } = serviceTypes[type];
                  const Component = FORM_ELEMENTS[dataType];
                  return (
                    <Component
                      key={type}
                      serviceType={type}
                      displayName={displayName}
                      formData={formData}
                      onChange={setFormData}
                    />
                  );
                })}
              </tbody>
            </table>

            <div className="pt-3 d-flex justify-content-center align-items-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  update();
                }}
                className="btn btn-primary"
              >
                Update Records
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Update;
