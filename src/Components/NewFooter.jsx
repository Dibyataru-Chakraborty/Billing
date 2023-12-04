import { Footer } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";

export default function NewFooter() {
  return (
    <>
      {/* <div className="my-2">
        <div className="card">
          <div className="card-footer text-body-secondary text-center">
            <blockquote className="blockquote mb-0">
              <pre>
                &#169; Copyright 2023 . Developed by{" "}
                <cite title="Source Title">Forbidden - </cite>
                <cite title="Source Title">403</cite>
              </pre>
            </blockquote>
          </div>
        </div>
      </div> */}
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        <blockquote className="blockquote mb-0">
          <pre>
            &#169; Copyright 2023 . Developed by{" "}
            <cite title="Source Title">Forbidden - </cite>
            <cite title="Source Title">403</cite>
          </pre>
        </blockquote>
      </Footer>
    </>
  );
}
