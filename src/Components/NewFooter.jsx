
import React from "react";

export default function NewFooter() {
  return (
    <>
      <div className="my-2">
        <div className="card">
          <div className="card-footer text-body-secondary text-center">
            <blockquote className="blockquote mb-0">
              <pre>
                <img src="/logo512.png" alt="Logo" style={{height:'35px'}}/>{" "}
                &#169; Copyright 2023 . Developed by{" "}
                <cite title="Source Title">Forbidden - </cite>
                <cite title="Source Title">403</cite>
              </pre>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}
