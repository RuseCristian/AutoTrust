import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AiOutlineUnlock } from "react-icons/ai";
import Image from "next/image";

export default function LoginPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-center max-w-md mx-auto p-4 md:max-w-2xl md:p-6 lg:p-8">
        {/* Adjusted max width for small screens and centered */}
        <DialogHeader>
          <AiOutlineUnlock className="w-12 h-12 text-blue-600 mx-auto mb-4 md:w-16 md:h-16" />
          <DialogTitle className="text-xl md:text-2xl font-bold">
            Unlock More Features
          </DialogTitle>
        </DialogHeader>
        <Image
          src="/illustration_art/1.jpg"
          alt="Explore More Features"
          width={300} // Set width to 300px
          height={300} // Set height to 300px for a square aspect ratio
          className="mx-auto my-4 rounded"
        />
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          You’re just a step away from accessing a world of exciting features!
          By logging in, you can enjoy a more personalized experience, exclusive
          tools, and seamless access to all the great things we offer. Don’t
          miss out—join us now!
        </p>
        <DialogFooter className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Button variant="ghost" onClick={onClose}>
            Maybe Later
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
            onClick={handleLoginRedirect}
          >
            Log In & Explore
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
