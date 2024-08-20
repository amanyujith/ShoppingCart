import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../Components/Navbar";
import Button from "../Utilities/Button";
import { useState } from "react";
import { Modal } from "../Components/Modal";


const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const handleModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loader rounded-full p-5 flex space-x-3">
          <div className="w-5 h-5 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="w-5 h-5 bg-gray-800 rounded-full animate-spin"></div>
          <div className="w-5 h-5 bg-gray-800 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center space-y-4 p-4 sm:p-8">
          <img
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
            src={user?.picture}
            alt={user?.name}
          />
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            {user?.name}
          </h2>
          <p className="text-gray-600 text-center">
            Logged in as {user?.email}
          </p>
          <div className="w-full sm:w-auto">
            <Button
              onClick={
                isAuthenticated
                  ? () => (window.location.href = "/portal")
                  : () => {}
              }
              value="Portal"
            />
          </div>
          <div className="w-full sm:w-auto">
            <Button value="LogOut" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          title="Do You Want to Logout"
          cancel="No"
          onCancel={handleModal}
          buttonText="Yes"
          buttonAction={logout}
        />
    
      </div>
    )
  );
};

export default Profile;
