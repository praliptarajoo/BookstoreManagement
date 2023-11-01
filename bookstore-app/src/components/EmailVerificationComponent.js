import React, { useState } from "react";

const EmailVerificationComponent = ({ onVerificationSuccess }) => {
    const [email, setEmail] = useState("");
    const [verificationError, setVerificationError] = useState("");

    const handleVerification = () => {
        if (email.toLowerCase() === "admin@test.com") {
            onVerificationSuccess();
        } else {
            setVerificationError(
                "Invalid email. Please enter the correct email address."
            );
        }
    };

    return (
        <div className="email-verification">
            <h2>Email Verification</h2>
            <p>Please enter your email address to verify your admin status.</p>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-primary"
                        onClick={handleVerification}
                    >
                        Verify
                    </button>
                </div>
            </div>
            {verificationError && (
                <p className="text-danger">{verificationError}</p>
            )}
        </div>
    );
};

export default EmailVerificationComponent;
