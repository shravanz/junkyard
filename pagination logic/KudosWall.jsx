import { useState } from "react";
import { PlusCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";
import KudosCard from "./kudos-card";
import KudosModal from "./kudos-modal";
import GiveKudosForm from "./give-kudos-form";
import "./kudos.css";

const kudosData = [
  { recipient: "Basavaraj", sender: "Shravan", message: "Thanks for your amazing work on the project! Your dedication really made a difference.", category: "Teamwork" },
  { recipient: "Chaitra", sender: "Sumit", message: "Your innovative solution saved us hours of work. Great job thinking outside the box!", category: "Innovation" },
  { recipient: "Ajay babu", sender: "Jiten", message: "Your leadership during the last sprint was exceptional. Thank you for guiding the team to success.", category: "Leadership" },
  { recipient: "Ajay babu", sender: "Jiten", message: "Leadership skills!", category: "Leadership" },
  { recipient: "Basavaraj", sender: "Shravan", message: "Thanks for your amazing work on the project! Your dedication really made a difference.", category: "Teamwork" },
  { recipient: "Chaitra", sender: "Sumit", message: "Your innovative solution saved us hours of work. Great job thinking outside the box!", category: "Innovation" },
  { recipient: "Ajay babu", sender: "Jiten", message: "Your leadership skills have been truly inspiring.", category: "Leadership" },
  { recipient: "Basavaraj", sender: "Shravan", message: "Your hard work has paid off, great job!", category: "Teamwork" },
  { recipient: "Chaitra", sender: "Sumit", message: "Awesome creativity and problem-solving skills!", category: "Innovation" },
  { recipient: "mahesh", sender: "Jiten", message: "Exceptional leadership skills, keep it up!", category: "Leadership" }
];

export default function KudosWall() {
  const [selectedKudos, setSelectedKudos] = useState(null);
  const [isGivingKudos, setIsGivingKudos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter kudos based on search term
  const filteredKudos = kudosData.filter(
    (kudos) =>
      kudos.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kudos.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kudos.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kudos.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredKudos.length / itemsPerPage);
  const displayedKudos = filteredKudos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

        {/* Search Input */}
        <div className="search-filter">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search kudos..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>

        {/* Kudos Grid */}
        <div className="kudos-grid fade-in">
          {displayedKudos.map((kudos, index) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={18} /> Prev
            </button>
            <span className="page-number">Page {currentPage} of {totalPages}</span>
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Kudos Modal */}
      {selectedKudos && <KudosModal kudos={selectedKudos} onClose={() => setSelectedKudos(null)} isOpen={!!selectedKudos} />}

      {/* Give Kudos Form */}
      {isGivingKudos && <GiveKudosForm isOpen={isGivingKudos} onClose={() => setIsGivingKudos(false)} />}
    </div>
  );
}
