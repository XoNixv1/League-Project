import { Link, useParams } from "react-router-dom";
import "./champPage.scss";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchChamps } from "../champsList/ChampSlice";
import { Champion } from "../champsList/champTypes";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/animations.scss";
import { selectChampionById } from "../selectors/Selectors";

const ChampPage = (): JSX.Element => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { champId } = useParams<{ champId: string }>();
  const champData = useSelector((state: RootState) =>
    selectChampionById(state, champId)
  );
  const [champion, setChampion] = useState<Champion>();
  const [spellInfo, setSpellInfo] = useState<string>("");
  const [fadeData, setFadeData] = useState<string>("");
  const [fade, setFade] = useState<boolean>(true);

  const { loading, error } = useSelector(
    (state: RootState) => state.champsReducer
  );

  useEffect(() => {
    dispatch(fetchChamps("http://localhost:3002/champ-list"));
  }, [dispatch]);

  useEffect(() => {
    const element = document.getElementById("toTop");
    if (element) {
      element.scrollIntoView({ block: "start" });
    }
  }, []);

  useEffect(() => {
    if (champData) {
      setChampion(champData);
      setSpellInfo(champData.passive.name);
      setFadeData(champData.passive.name);
    }
  }, [loading, champData]);

  const statNames: Record<string, string> = {
    hp: "Health",
    hpperlevel: "Health per lvl",
    mp: "Mana",
    mpperlevel: "Mana per lvl",
    movespeed: "Movement Speed",
    armor: "Armor",
    armorperlevel: "Armor per lvl",
    spellblock: "Magic Resist",
    spellblockperlevel: "Magic Resist per lvl",
    attackrange: "Attack Range",
    hpregen: "Health Regen",
    hpregenperlevel: "Health Regen per lvl",
    mpregen: "Mana Regen",
    mpregenperlevel: "Mana Regen per lvl",
    crit: "Critical Strike Chance",
    critperlevel: "Crit Chance per lvl",
    attackdamage: "Attack Damage",
    attackdamageperlevel: "Attack Damage per lvl",
    attackspeedperlevel: "Attack Speed per lvl",
    attackspeed: "Attack Speed",
  };

  const onSpellClick = (id: string) => {
    setSpellInfo(id);
    if (fadeData !== id) {
      setFade(false);
      setTimeout(() => {
        setFadeData(id);
        setFade(true);
      }, 500);
    }
  };

  const renderSpellDescription = (): string => {
    const spellOrPassiveDescr: string | undefined = champData
      ? champData.spells.find((item) => item.id === fadeData)?.description ||
        champData.passive.description
      : "Something went wrong";
    return spellOrPassiveDescr;
  };

  const renderStats = (champion: Champion) => {
    return (
      <TransitionGroup component={null}>
        {Object.entries(champion.stats).map(([key, value]) => (
          <CSSTransition
            key={key}
            timeout={500}
            unmountOnExit
            classNames="fade"
          >
            <div className="stats__section" key={key}>
              <div className="stats__descr-name">
                <img src={`/assets/statsIcons/${key}.webp`} alt="" />
                <p>{statNames[key]}</p>
              </div>
              <p className="stats__descr-value">{value}</p>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  };

  const renderAbilities = (champ: Champion): JSX.Element => {
    const spellKeys: string[] = ["Q", "W", "E", "R"];
    return (
      /// PASSIVE

      <div className="container">
        <div className="spell-container">
          <div
            className="spell__passive"
            onClick={() => onSpellClick(champ.passive.name)}
          >
            <img
              className={`spell ${
                spellInfo === champ.passive.name ? "spell__active" : ""
              }`}
              src={require(`../../assets/passiveIcons/${champ.passive.image.full}`)}
              alt={champ.passive.name}
            />
            <label className="spell__passive_label">P</label>
          </div>
          <div className="spell-devider"></div>

          {/* SPELLS */}

          {champ.spells.map((spell, key) => (
            <div
              className="spell"
              key={key}
              onClick={() => onSpellClick(spell.id)}
            >
              <img
                className={`spell ${
                  spellInfo === spell.id ? "spell__active" : ""
                }`}
                src={require(`../../assets/spellIcons/${spell.id}.png`)}
                alt={spell.id}
              />
              <label className="spell__label">
                {spellKeys[key % spellKeys.length]}
              </label>
            </div>
          ))}
        </div>
        <div className="second-spell-devider"></div>
        <CSSTransition
          timeout={500}
          classNames="fade"
          key="spells"
          unmountOnExit
          in={fade}
        >
          <div className="spell__descr-container">
            <h4 style={{ fontSize: 18 }}>
              {champ
                ? champ.spells
                    .find((item) => item.id === fadeData)
                    ?.name.toUpperCase() || champ.passive?.name.toUpperCase()
                : "Error"}
            </h4>
            <p className="spell__descr">{renderSpellDescription()}</p>
          </div>
        </CSSTransition>
      </div>
    );
  };

  if (error.length > 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="stats">
      <Link to={"/"} className="back-btn" id="back"></Link>
      <div className="stats__img">
        <img
          src={require(`../../assets/champSplash/${champId}_0.jpg`)}
          alt=""
        />
      </div>
      <div className="stats__header">Base statistics</div>
      <div className="stats__descr">
        {champion ? renderStats(champion) : undefined}
      </div>
      {champion ? renderAbilities(champion) : undefined}
    </div>
  );
};

export default ChampPage;
