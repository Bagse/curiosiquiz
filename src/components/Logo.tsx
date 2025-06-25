import { Link } from "react-router-dom";

function Logo() {
  const fontSizeClass = `text-4xl md:text-6xl font-bold`;
  return (
    <div>
      <Link to="/" className="flex items-center gap-2">
        <h1 className={fontSizeClass}>CuriosiQuiz</h1>
        <img
          src="/img/pregunta.png"
          alt="imagen pregunta"
          className="bg-white rounded-full w-[50px] md:w-[55px] h-[50px] md:h-[55px]"
        />
      </Link>
    </div>
  );
}

export default Logo;
