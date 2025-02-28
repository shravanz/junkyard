import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Star, X } from "lucide-react";
import "./kudos.css";

export default function GiveKudosForm({ isOpen, onClose }) {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <div className="modal-overlay">
          <Dialog.Content className="give-kudos-form">
            {/* Close Button
            <Dialog.Close asChild>
              <button className="close-button" onClick={onClose}>
                <X size={20} />
              </button>
            </Dialog.Close> */}
            <Dialog.Title className="give-kudos-title">
              <Star className="give-kudos-star" /> Give Kudos <Star className="give-kudos-star" />
            </Dialog.Title>

            {/* Form Fields */}
            <div className="give-kudos-content">
              {/* Recipient Input */}
              <div className="give-kudos-field">
                <label className="give-kudos-label">Recipient</label>
                <input
                  type="text"
                  className="give-kudos-input"
                  placeholder="Enter recipient's name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              {/* Message Input */}
              <div className="give-kudos-field">
                <label className="give-kudos-label">Message</label>
                <textarea
                  className="give-kudos-textarea"
                  placeholder="Write your kudos message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Category Selection */}
              <div className="give-kudos-field">
                <label className="give-kudos-label">Category</label>
                <select
                  className="give-kudos-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>Select a category</option>
                  <option value="teamwork">Teamwork</option>
                  <option value="innovation">Innovation</option>
                  <option value="leadership">Leadership</option>
                </select>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="give-kudos-footer">
            <button className="give-kudos-submit">Send Kudos</button>
              <button className="give-kudos-cancel" onClick={onClose}>
                Cancel
              </button>
              
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
