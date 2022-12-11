import { FC } from "react";
import classnames from "classnames";

export enum alertVariants {
  SUCCESS = "alert-success",
  INFO = "alert-info",
}

type Props = {
  message: string;
  show?: boolean;
  variant?: alertVariants;
};

const Alert: FC<Props> = ({
  message,
  show,
  variant = alertVariants.SUCCESS,
}) => {
  return (
    <div className={classnames("alert", variant, "small")}>
      <div>{message}</div>
    </div>
  );
};

export default Alert;
