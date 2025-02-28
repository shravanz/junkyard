import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";

export default function KudosModal({ kudos, onClose, isOpen }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const modalRef = useRef(null);
  const [modalSize, setModalSize] = useState({ width: 500, height: 300 }); // Default size

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000); // Stops after 2 sec

      // Get modal dimensions
      if (modalRef.current) {
        const { offsetWidth, offsetHeight } = modalRef.current;
        setModalSize({ width: offsetWidth, height: offsetHeight });
      }
    }
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="kudos-modal" ref={modalRef}>
          {/* Confetti inside modal */}
          {showConfetti && (
            <Confetti
              width={modalSize.width} // Matches modal width
              height={modalSize.height} // Matches modal height
              numberOfPieces={200} // Subtle effect
              gravity={0.1} // Slow fall
              tweenDuration={5000} // Smooth animation
              recycle={false} // Stops after animation

            />
          )}

          <Dialog.Title className="kudos-modal-title">Kudos Details</Dialog.Title>
          <p className="kudos-modal-description">Celebrate this amazing recognition!</p>

          <div className="kudos-modal-content">
            <div>
              <h3 className="kudos-modal-recipient">{kudos.recipient}</h3>
              <p className="kudos-modal-sender">Received kudos from {kudos.sender}</p>
            </div>
            <p className="kudos-modal-message">{kudos.message}</p>
            <div className="kudos-modal-category">{kudos.category}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
