import { Link } from "react-router-dom";
import "./header.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useRef, useState } from "react";
import { Champion } from "../../champsList/champTypes";
import { CSSTransition } from "react-transition-group";

const Header = () => {
  const championsList: Champion[] = useSelector((state: RootState) =>
    Object.values(state.champsReducer.entities)
  );
  console.log(championsList);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchRef = useRef<HTMLFormElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
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
    <header className="header">
      <Link className="header__logo-name" to={"/"}>
        <img
          className="header__logo"
          src="/assets/headerIcons/logo.svg"
          alt="Logo"
        />
        <h3>CHAMPION STATS</h3>
      </Link>
      <form className="header__search-panel" ref={searchRef}>
        <img
          className="header__search-panel_icon"
          src="/assets/headerIcons/search.svg"
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
                    src={require(`../../../assets/champIcons/${champ.id}.png`)}
                    alt=""
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
