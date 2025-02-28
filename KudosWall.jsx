import { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import KudosCard from "./kudos-card";
import KudosModal from "./kudos-modal";
import GiveKudosForm from "./give-kudos-form";
import "./kudos.css";

const kudosData = [
  {
    recipient: "Basavaraj",
    sender: "Shravan",
    message: "Thanks for your amazing work on the project! Your dedication really made a difference.",
    category: "Teamwork",
  },
  {
    recipient: "Chaitra",
    sender: "Sumit",
    message: "Your innovative solution saved us hours of work. Great job thinking outside the box!",
    category: "Innovation",
  },
  {
    recipient: "Ajay babu",
    sender: "Jiten",
    message: "Your leadership during the last sprint was exceptional. Thank you for guiding the team to success.",
    category: "Leadership",
  },
  { recipient: "Ajay babu", sender: "Jiten", message: "Leadership skills!", category: "Leadership" },
  { recipient: "Ajay babu", sender: "Jiten", message: "Leadership skills!", category: "Leadership" },
  {
    recipient: "Basavaraj",
    sender: "Shravan",
    message: "Thanks for your amazing work on the project! Your dedication really made a difference.",
    category: "Teamwork",
  },
  {
    recipient: "Chaitra",
    sender: "Sumit",
    message: "Your innovative solution saved us hours of work. Great job thinking outside the box!",
    category: "Innovation",
  },
  {
    recipient: "Ajay babu",
    sender: "Jiten",
    message: "I truly want to express my heartfelt gratitude for the dedication and hard work you've consistently displayed. Your positive attitude and commitment to teamwork have significantly impacted our work environment, making it a more inspiring place to be. I greatly appreciate your innovative ideas and creative solutions, which have proven invaluable time and time again. It's a genuine pleasure to work alongside someone as talented and enthusiastic as you, and your contributions do not go unnoticed. Thank you for always bringing your best to every task and for making the workplace a better, brighter place with your presence.I hope that helps! Let me know if you need any further adjustments",
    category: "Leadership",
  },
  {
    recipient: "Basavaraj",
    sender: "Shravan",
    message: "Thanks for your amazing work on the project! Your dedication really made a difference.",
    category: "Teamwork",
  },
  {
    recipient: "Chaitra",
    sender: "Sumit",
    message: "Your innovative solution saved us hours of work. Great job thinking outside the box!",
    category: "Innovation",
  },
  {
    recipient: "Ajay babu",
    sender: "Jiten",
    message: "Your leadership during the last sprint was exceptional. Thank you for guiding the team to success.",
    category: "Leadership",
  },
];

export default function KudosWall() {
  const [selectedKudos, setSelectedKudos] = useState(null);
  const [isGivingKudos, setIsGivingKudos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredKudos = kudosData.filter(
    (kudos) =>
      kudos.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kudos.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kudos.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kudos.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="kudos-wall">
      <div className="kudos-container">
        <div className="kudos-header">
          <h1 className="kudos-title">Kudos Wall🥳</h1>
          <button className="give-kudos-btn" onClick={() => setIsGivingKudos(true)}>
            Give Kudos
            <PlusCircle className="plus-icon" /> 
          </button>
        </div>

        <div className="search-filter">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search kudos..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="kudos-grid">
          {filteredKudos.map((kudos, index) => (
            <KudosCard
              key={index}
              recipient={kudos.recipient}
              sender={kudos.sender}
              message={kudos.message}
              category={kudos.category}
              onClick={() => setSelectedKudos(kudos)}
            />
          ))}
        </div>
      </div>

      {/* Kudos Modal for viewing a kudos message */}
      {selectedKudos && <KudosModal kudos={selectedKudos} onClose={() => setSelectedKudos(null)} isOpen={!!selectedKudos} />}

      {/* Fixed Give Kudos Form */}
      {isGivingKudos && <GiveKudosForm isOpen={isGivingKudos} onClose={() => setIsGivingKudos(false)} />}
    </div>
  );
}
