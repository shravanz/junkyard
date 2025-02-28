import * as Dialog from "@radix-ui/react-dialog";
import { Star } from "lucide-react";

export default function KudosModal({ kudos, onClose, isOpen }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="kudos-modal">
          <Dialog.Title className="kudos-modal-title">
            Kudos Details 
          </Dialog.Title>
          <p className="kudos-modal-description">Celebrate this amazing recognition!</p>
          <div className="kudos-modal-content">
            {/* <div className="kudos-modal-avatar">{kudos.recipient.charAt(0)}</div> */}
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
