// WineCard.tsx
// Author: Jun Beom

import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import {
  fetchRecommendations,
  WineRecommendation,
} from "../services/fetchRecommendations"; // Adjust the path as necessary
import Modal from "../components/Modal"; // Assuming you have a Modal component
import {
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaComments,
} from "react-icons/fa"; // Icons for platforms
import "../style/card/wineCard.css"; // Import the CSS file

interface WineCardProps {
  answers: { [key: number]: boolean };
  onTryAgain: () => void;
}

const WineCard: React.FC<WineCardProps> = ({ answers, onTryAgain }) => {
  const [recommendations, setRecommendations] = useState<WineRecommendation[]>(
    []
  );
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const debouncedFetchRecommendations = debounce(async () => {
      const fetchedRecommendations = await fetchRecommendations(answers);
      setRecommendations(fetchedRecommendations);
    }, 500); // Adjust the debounce delay as needed

    debouncedFetchRecommendations();

    // Cleanup function to cancel debounced function on unmount
    return () => {
      debouncedFetchRecommendations.cancel();
    };
  }, [answers]);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const shareOnPlatform = (platform: string) => {
    // Implement sharing functionality based on the selected platform
    console.log(`Sharing on ${platform}`);
    // Close the modal after sharing
    closeShareModal();
  };

  const handleTryAgain = () => {
    // Call the prop function to refresh the test
    onTryAgain();
  };

  return (
    <div className="wine-card-container">
      <div className="wine-card-title">
        <h2>Wine Recommendations</h2>
      </div>
      <div className="wine__recommendations">
        {recommendations.map((recommendation, index) => (
          <div className="wine-recommendations" key={index}>
            <h3 className="wine-name">{recommendation.name}</h3>
            {/* Display more information about the recommendation */}
          </div>
        ))}
        <button className="wine-card-button" onClick={handleTryAgain}>
          Try again!
        </button>
        <button className="wine-card-button" onClick={handleShare}>
          Share
        </button>
        {showShareModal && (
          <Modal isOpen={showShareModal} onClose={closeShareModal}>
            <h2>Share on:</h2>
            <div className="share-button">
              <button onClick={() => shareOnPlatform("email")}>
                <FaEnvelope />
              </button>
              <button onClick={() => shareOnPlatform("instagram")}>
                <FaInstagram />
              </button>
              <button onClick={() => shareOnPlatform("twitter")}>
                <FaTwitter />
              </button>
              <button onClick={() => shareOnPlatform("facebook")}>
                <FaFacebook />
              </button>
              <button onClick={() => shareOnPlatform("kakaotalk")}>
                <FaComments />
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default WineCard;
