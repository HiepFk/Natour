import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activeEmail } from "../../apis/authApi";
import { useAppDispatch } from "../../redux/store";

export default function ActivationEmail() {
  const { activation_token } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      activeEmail(activation_token, dispatch, navigate);
    }
  }, [activation_token, dispatch, navigate]);

  return (
    <main className="main" style={{ height: "70vh" }}>
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            ActivationEmail Success
          </h2>
          <h2 className="error__emoji">❤️</h2>
        </div>
      </div>
    </main>
  );
}
