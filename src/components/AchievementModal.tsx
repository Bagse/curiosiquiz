import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Achievement {
  id: string;
  title: string;
  description: string;
  image: string;
  unlocked: boolean;
  shownOnce?: boolean;
}

interface AchievementModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  achievements: Achievement[];
}

export default function AchievementModal({
  open,
  onClose,
  title,
  achievements,
}: AchievementModalProps) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setIndex(0);
    }
  }, [open]);

  if (!open || achievements.length === 0) return null;

  const current = achievements[index];
  const isLast = index === achievements.length - 1;

  const next = () => {
    if (isLast) {
      onClose();
      navigate("/achievements");
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 text-white p-6 rounded-xl shadow-lg w-[90vw] max-w-md flex flex-col items-center text-center">
          {/* Header */}
          <div className="flex justify-between items-center w-full mb-4">
            <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
            <button onClick={onClose} className="text-white text-lg font-bold">
              ✕
            </button>
          </div>

          {/* Imagen del logro */}
          <img
            src={current.image}
            alt={current.title}
            className="w-24 h-24 md:w-32 md:h-32 rounded border border-white/20 mb-4"
          />

          {/* Título y descripción */}
          <h3 className="text-lg font-semibold mb-1">{current.title}</h3>
          <p className="text-sm text-neutral-400">{current.description}</p>

          {/* Botón de acción */}
          <button
            onClick={next}
            className="mt-6 w-full bg-green-500 rounded px-4 py-2 hover:bg-green-600 transition"
          >
            {isLast ? "Ver mis logros" : "Siguiente"}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
