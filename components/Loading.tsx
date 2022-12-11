import { FC } from "react";

const Loading: FC = () => (
  <main className="container">
    <div className="col-4 mx-auto d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-grow"></div>
    </div>
  </main>
);

export default Loading;
