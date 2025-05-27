import { Dialog } from "@headlessui/react";
import { Button } from "./ui/button";

const PaymentModal = ({ isOpen, onClose, onConfirm, price }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full space-y-4">
        <Dialog.Title className="text-lg font-bold">Confirm Purchase</Dialog.Title>
        <p className="text-gray-700">This video costs ₹{price}. Do you want to proceed?</p>
        <div className="flex gap-2 justify-end">
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
