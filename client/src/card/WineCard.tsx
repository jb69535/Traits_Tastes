// WineCard.tsx
// Author: Jun Beom

import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import {
  fetchRecommendations,
  WineRecommendation,
} from "../services/fetchRecommendations";
import Modal from "../components/Modal";
import { FaEnvelope, FaInstagram, FaSms } from "react-icons/fa";
import "../style/card/wineCard.css";

interface WineCardProps {
  answers: { [key: number]: boolean };
  onTryAgain: () => void;
  mbtiResult: string | null;
}

const WineCard: React.FC<WineCardProps> = ({
  answers,
  onTryAgain,
  mbtiResult,
}) => {
  const [recommendations, setRecommendations] = useState<WineRecommendation[]>(
    []
  );
  const [showShareModal, setShowShareModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const debouncedFetchRecommendations = debounce(async () => {
      if (mbtiResult) {
        console.log("Fetching recommendations for MBTI result:", mbtiResult);
        const fetchedRecommendations = await fetchRecommendations(mbtiResult);
        console.log("Fetched Recommendations:", fetchedRecommendations);
        setRecommendations(fetchedRecommendations);
      }
    }, 500);

    debouncedFetchRecommendations();
    return () => {
      debouncedFetchRecommendations.cancel();
      console.log("Cleanup or cancellation occurred");
    };
  }, [mbtiResult]);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const shareOnPlatform = (platform: string) => {
    let url = "";
    switch (platform) {
      case "email":
        url = `mailto:?subject=Wine Recommendation&body=Check out this wine recommendation at ${window.location.href}`;
        break;
      case "sms":
        if (phoneNumber) {
          url = `sms:${phoneNumber}?&body=Check out this wine recommendation at ${window.location.href}`;
          window.open(url, "_blank");
        } else {
          alert("Please enter a valid phone number.");
        }
        break;
      case "instagram":
        alert(
          "To share on Instagram stories, please save the link and share it through the Instagram app."
        );
        break;
      default:
        console.error("Unsupported platform");
        return;
    }

    closeShareModal();
  };

  const handleTryAgain = () => {
    // Call the prop function to refresh the test
    onTryAgain();
  };

  // Function to handle shop click
  const handleShopClick = (recommendation: any) => {
    const query = `${recommendation.Title} ${recommendation.Grape} Vintage ${recommendation.Vintage}`;
    const url = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="wine-card-container">
      <div className="wine-card-title">
        <h2>Wine Recommendations</h2>
      </div>
      <div className="MBTI">
        {mbtiResult && <h3>MBTI Result: {mbtiResult}</h3>}
      </div>
      <div className="wine__recommendations">
        {recommendations.map((recommendation, index) => (
          <div className="wine-recommendation-item" key={index}>
            <h3 className="wine-name">{recommendation.Title}</h3>
            <p className="wine-grape">{recommendation.Grape}</p>
            <p className="wine-vintage">{recommendation.Vintage}</p>
            <p className="wine-characteristics">
              {recommendation.Characteristics}
            </p>
            <div className="goShop">
              <button onClick={() => handleShopClick(recommendation)}>GO Shop</button>
            </div>
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
            <input
              type="text"
              placeholder="Enter phone number for SMS"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="share-button">
              <button onClick={() => shareOnPlatform("email")}>
                <FaEnvelope />
              </button>
              <button onClick={() => shareOnPlatform("instagram")}>
                <FaInstagram />
              </button>
              <button onClick={() => shareOnPlatform("sms")}>
                <FaSms />
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default WineCard;
