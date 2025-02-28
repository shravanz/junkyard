import { useState } from "react";
import { Star } from "lucide-react";

export default function KudosCard({ recipient, sender, message, category, onClick }) {
  const [isStarred, setIsStarred] = useState(false);

  const handleStarClick = (e) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
  };

  return (
    <div className="kudos-card" onClick={onClick}>
      <div className="kudos-card-header">
        <div className="kudos-card-avatar">
          {/* <div className="kudos-avatar">{recipient.charAt(0)}</div> */}
          <div className="kudos-card-info">
            <h3 className="kudos-recipient">{recipient}</h3>
            <p className="kudos-sender">From {sender}</p>
          </div>
        </div>
        <Star className={`kudos-star ${isStarred ? "starred" : ""}`} onClick={handleStarClick} />
      </div>
      <div className="kudos-message">{message}</div>
      <div className="kudos-card-footer">{category}</div>
    </div>
  );
}
