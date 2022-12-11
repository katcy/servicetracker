import { FC, useState } from "react";
import { useRouter } from "next/router";

import { addNewVehicle, addEmptyServiceRecords } from "../../services/index";

const NewVehicle: FC = () => {
  const router = useRouter();
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [nickName, setNickName] = useState("");

  return (
    <main className="container">
      <div className="col-6 mx-auto">
        <h1>Add New Vehicle</h1>
        <form>
          <label htmlFor="vehicleNumber" className="form-label">
            Vehicle Number
          </label>
          <input
            id="vehicleNumber"
            className="form-control"
            onChange={(e) => {
              e.preventDefault();
              setVehicleNumber(e.target.value);
            }}
          />
          <label htmlFor="nickName" className="form-label mt-4">
            Nick Name
          </label>
          <input
            id="nickName"
            className="form-control"
            onChange={(e) => {
              e.preventDefault();
              setNickName(e.target.value);
            }}
          />
          <div className="mt-4">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                addNewVehicle(vehicleNumber, nickName)
                  .then(() => addEmptyServiceRecords(vehicleNumber))
                  .then(() => {
                    router.push("/records");
                  });
              }}
            >
              Submit
            </button>
            <button
              className="btn btn-secondary ms-2"
              onClick={(e) => {
                e.preventDefault();
                router.push("/records");
              }}
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewVehicle;
