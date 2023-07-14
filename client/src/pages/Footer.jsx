import React from "react";

// === footer page
export default function Footer() {
  return (
    <div className="container my-5">
      <div className="container text-dark text-center mb-3">
        <hr />
        <div className="col-sm">
          <p>
            <span>E-mail: </span>qutstocks@gmail.com <br />
            <span>Phone: </span>+04 1234 5678
          </p>
        </div>
        <div>
          <p>
            QUT Gardens Point Campus <br /> George Street, Brisbane, QLD,
            Australia
          </p>
          <p>&copy;2023 QUT Stocks</p>
        </div>
      </div>
    </div>
  );
}
