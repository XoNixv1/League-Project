import { Link } from "react-router-dom";
import "./header.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useRef, useState } from "react";
import { Champion } from "../champsList/champTypes";
import { CSSTransition } from "react-transition-group";

const Header = () => {
  const championsList: Champion[] = useSelector((state: RootState) =>
    Object.values(state.champsReducer.entities)
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchRef = useRef<HTMLFormElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // @ts-ignore
  const Images = require.context(
    "../../assets",
    true,
    /\.(png|jpe?g|webp|svg)$/
  );
  const filteredChampions = championsList.filter((champ) =>
    champ.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <header className="header" id="header">
      <Link className="header__logo-name" to={"/"}>
        <img
          className="header__logo"
          src={require("../../assets/headerIcons/logo.svg").default}
          alt="Logo"
        />
        <h3>CHAMPION STATS</h3>
      </Link>
      <form className="header__search-panel" ref={searchRef}>
        <img
          className="header__search-panel_icon"
          src={require("../../assets/headerIcons/search.svg").default}
          alt="Search"
        />
        <input
          className="header__search-panel_search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </form>
      <CSSTransition
        timeout={500}
        classNames="fade"
        in={isOpen && searchTerm.length >= 2 && filteredChampions.length < 7}
        unmountOnExit
      >
        <div className="header__champ-found">
          {filteredChampions.length > 0 ? (
            <ul className="header__list-found">
              {filteredChampions.map((champ, i) => (
                <Link
                  to={`/${champ.id}`}
                  className="header__item-found"
                  key={i}
                >
                  <img
                    src={Images(`./champIcons/${champ.id}.png`)}
                    alt={champ.name}
                  />
                  {champ.name}
                </Link>
              ))}
            </ul>
          ) : (
            <p className="header__wrong-search"> No champions found </p>
          )}
        </div>
      </CSSTransition>
    </header>
  );
};

export default Header;
