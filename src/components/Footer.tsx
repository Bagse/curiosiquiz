export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 pb-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] rounded-full bg-gradient-to-r from-purple-500/40 via-green-400/60 to-purple-500/40" />

      <div className="pt-6 text-center text-xs sm:text-sm text-neutral-500 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <span>&copy; {year} CuriosiQuiz</span>
        <span className="hidden sm:inline text-neutral-700">·</span>
        <span>
          Desarrollado por{" "}
          <a
            href="https://brian-gomez-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-colors duration-200 font-medium"
          >
            Bagse
          </a>
        </span>
      </div>
    </footer>
  );
};
