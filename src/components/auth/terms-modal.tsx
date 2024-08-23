import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h3>1. Acceptance of Terms</h3>
          <p>
            By creating an account, you agree to comply with and be bound by the
            following terms and conditions. If you do not agree to these terms,
            you should not use this platform.
          </p>
          <h3>2. Account Registration</h3>
          <p>
            You must provide accurate, current, and complete information during
            the registration process and keep your account information updated.
          </p>
          <h3>3. Privacy Policy</h3>
          <p>
            Your registration and use of this platform are subject to our
            Privacy Policy, which governs the collection and use of your
            information.
          </p>
          <h3>4. User Responsibilities</h3>
          <ul>
            <li>
              You are responsible for maintaining the confidentiality of your
              account and password.
            </li>
            <li>
              You agree not to use the platform for any unlawful or prohibited
              activities.
            </li>
            <li>
              You agree to notify us immediately of any unauthorized use of your
              account.
            </li>
          </ul>
          <h3>5. Intellectual Property</h3>
          <p>
            All content on this platform, including text, graphics, logos, and
            software, is the property of the platform or its content suppliers
            and is protected by intellectual property laws.
          </p>
          <h3>6. Prohibited Activities</h3>
          <ul>
            <li>
              You agree not to engage in activities that may harm the platform,
              its users, or third parties.
            </li>
            <li>
              You are prohibited from using the platform to disseminate any
              unlawful, harassing, defamatory, or otherwise objectionable
              content.
            </li>
          </ul>
          <h3>7. Termination</h3>
          <p>
            We reserve the right to suspend or terminate your account if you
            violate these terms or engage in any activities that may harm the
            platform or its users.
          </p>
          <h3>8. Limitation of Liability</h3>
          <p>
            We are not liable for any damages resulting from your use of the
            platform. Your use of the platform is at your own risk.
          </p>
          <h3>9. Changes to Terms</h3>
          <p>
            We reserve the right to modify these terms at any time. Your
            continued use of the platform following any changes constitutes your
            acceptance of the new terms.
          </p>
          <h3>10. Governing Law</h3>
          <p>
            These terms and your use of the platform are governed by the laws of
            [Your Jurisdiction].
          </p>
          <h3>11. Contact Information</h3>
          <p>
            For any questions regarding these terms, please contact us at [Your
            Contact Information].
          </p>
        </DialogDescription>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
