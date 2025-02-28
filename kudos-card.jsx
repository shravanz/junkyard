import { useState } from "react";
import { Heart, Pin } from "lucide-react";

export default function KudosCard({ recipient, sender, message, category, onClick }) {
  const [heartCount, setHeartCount] = useState(0);
  const [isHearted, setIsHearted] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (isHearted) {
      setHeartCount(heartCount - 1);
    } else {
      setHeartCount(heartCount + 1);
    }
    setIsHearted(!isHearted);
  };

  return (
    <div className="kudos-card" onClick={onClick}>
      {/* Pin Element */}
      <div className="kudos-pin">
        <Pin className="pin-icon" />
      </div>

      <div className="kudos-card-header">
        <div className="kudos-card-avatar">
          <div className="kudos-card-info">
            <h3 className="kudos-recipient">{recipient}</h3>
            <p className="kudos-sender">From {sender}</p>
          </div>
        </div>

        {/* Heart Icon with Count */}
        <div className="kudos-heart-container" onClick={handleHeartClick}>
          <Heart className={`kudos-heart ${isHearted ? "hearted" : ""}`} />
          <span className="heart-count">{heartCount}</span>
        </div>
      </div>

      <div className="kudos-message">{message}</div>
      <div className="kudos-card-footer">{category}</div>
    </div>
  );
}
