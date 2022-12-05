import { FC, Dispatch, SetStateAction } from "react";

import { IServiceType, ServiceFormFieldProps } from "../types/types";

const BooleanComponent: FC<ServiceFormFieldProps> = ({
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
      <td className="p-3">
        <input
          id={serviceType}
          required
          type="checkbox"
          className="form-check-input "
          onChange={(e) => {
            onChange({ ...formData, [serviceType]: e.target.checked });
          }}
        />
      </td>
    </tr>
  );
};

export default BooleanComponent;
