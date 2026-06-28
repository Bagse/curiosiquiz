import { Link } from "react-router-dom";

function Logo() {
  const fontSizeClass = `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold`;
  return (
    <div>
      <Link to="/" className="flex items-center gap-2">
        <h1 className={fontSizeClass}>CuriosiQuiz</h1>
        <img
          src="/img/pregunta.png"
          alt="imagen pregunta"
          className="bg-white rounded-full w-[40px] sm:w-[50px] md:w-[55px] h-[40px] sm:h-[50px] md:h-[55px]"
        />
      </Link>
    </div>
  );
}

export default Logo;
