import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";

import adminService from "../services/admins";
import TextInput from "./TextInput";
import ConfirmCreation from "./ConfirmCreation";

const ConfirmComponent = ({
  email,
  isSuperAdmin,
}: {
  email: string;
  isSuperAdmin: boolean;
}) => {
  return (
    <div>
      <div>
        <span className="font-bold">{email}</span> has been invited to
        collaborate as{" "}
        <span className="font-bold">
          {isSuperAdmin ? "a superadmin" : "an admin"}
        </span>{" "}
        in the platform. Patiently wait for the user to accept the invitation.
      </div>
      <div>
        <Link to="/admins">Go back to admins page</Link>
      </div>
    </div>
  );
};

const AdminForm = () => {
  const [email, setEmail] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    adminService
      .create(email, isSuperAdmin)
      .then(() => {
        setErrorMessage("");
        setCompleted(true);
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setErrorMessage("An account with this email already exists.");
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="w-full py-4 px-6 bg-custom-light-grey border-b border-gray-200">
        <h1 className="font-bold text-2xl">Invite Admin</h1>
      </div>
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="bg-custom-light-grey p-12 rounded-lg shadow-xl w-full max-w-2xl">
          {errorMessage && <Alert message={errorMessage} />}

          {completed ? (
            <ConfirmComponent email={email} isSuperAdmin={isSuperAdmin} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <TextInput
                label="Email address"
                type="email"
                id="email"
                name="email"
                value={email}
                setValue={setEmail}
                placeholder="example@email.com"
                required
              />

              <div className="flex items-center">
                <input
                  id="super-admin"
                  type="checkbox"
                  checked={isSuperAdmin}
                  onChange={(e) => setIsSuperAdmin(e.target.checked)}
                  className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
                />
                <label
                  htmlFor="super-admin"
                  className="ml-2 text-lg font-semibold text-gray-900"
                >
                  Super admin privileges
                </label>
              </div>

              <ConfirmCreation to="/admins" />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
