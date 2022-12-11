import { FC } from "react";
import classnames from "classnames";

type Props = {
  header: string;
  message: string;
  show: boolean;
};

const Toast: FC<Props> = ({ header, message, show }) => {
  return (
    <div className={classnames("toast", { show: show })}>
      <div className="toast-header">{header}</div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Toast;
