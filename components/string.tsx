import { FC, Dispatch, SetStateAction } from "react";

import { IServiceType, ServiceFormFieldProps } from "../types/types";

const StringComponent: FC<ServiceFormFieldProps> = ({
  serviceType,
  displayName,
  onChange,
  formData,
}) => {
  return (
    <tr>
      <td>
        <label htmlFor={serviceType} className="col-form-label">
          {displayName}
        </label>
      </td>
      <td>
        <input
          id={serviceType}
          className="form-control"
          onChange={(e) => {
            onChange({ ...formData, [serviceType]: e.target.value });
          }}
        />
      </td>
    </tr>
  );
};

export default StringComponent;
