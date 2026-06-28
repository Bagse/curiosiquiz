import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AchievementIcon from "./AchievementIcons";

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
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md outline-none">
          <div className="relative bg-gradient-to-b from-[#1e1e2e] to-[#151515] rounded-2xl border border-[#00ddaa]/20 shadow-2xl shadow-[#7857f6]/20 p-0 overflow-hidden animate-fade-in-up">
            {/* Glow top */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#7857f6]/30 rounded-full blur-3xl pointer-events-none" />

            {/* Accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#7857f6] via-[#00ddaa] to-[#7857f6]" />

            <div className="p-6 sm:p-8 flex flex-col items-center text-center relative z-10">
              {/* Header */}
              <div className="flex justify-between items-center w-full mb-6">
                <Dialog.Title className="text-lg font-bold font-mont text-transparent bg-clip-text bg-gradient-to-r from-[#7857f6] to-[#00ddaa]">
                  {title}
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-neutral-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Achievement icon with glow */}
              <div className="relative mb-5">
                <div className="absolute inset-0 bg-[#00ddaa]/20 rounded-full blur-2xl scale-150 animate-pulse" />
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#00ddaa]/30 bg-[#1a1a2e] flex items-center justify-center p-2 shadow-lg shadow-[#00ddaa]/10">
                  {current.image ? (
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-contain scale-100 animate-fade-in-up"
                    />
                  ) : (
                    <div className="w-full h-full p-3 animate-fade-in-up">
                      <AchievementIcon id={current.id} unlocked />
                    </div>
                  )}
                </div>
              </div>

              {/* Achievement name */}
              <h3 className="text-xl font-bold text-white mb-2 font-mont">
                {current.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
                {current.description}
              </p>

              {/* Divider */}
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#7857f6] to-[#00ddaa] rounded-full my-5" />

              {/* Action button */}
              <button
                onClick={next}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#7857f6] to-[#00ddaa] p-[1px] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2 rounded-xl bg-[#1a1a2e] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-transparent">
                  {isLast ? "Ver todos mis logros" : "Siguiente logro"}
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>

              {/* Step indicator */}
              {achievements.length > 1 && (
                <div className="flex items-center gap-1.5 mt-4">
                  {achievements.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index
                          ? "w-6 bg-gradient-to-r from-[#7857f6] to-[#00ddaa]"
                          : "w-1.5 bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
