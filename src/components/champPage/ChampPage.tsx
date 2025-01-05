import { useParams } from "react-router-dom";
import "./champPage.scss";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchChamps } from "../champsList/ChampSlice";
import { Champion } from "../champsList/champTypes";
import { CSSTransition } from "react-transition-group";

const ChampPage = (): JSX.Element => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { champId } = useParams<{ champId: string }>();
  const champData = useSelector((state: RootState) =>
    champId ? state.champsReducer.entities[champId] : undefined
  );
  const [champion, setChampion] = useState<Champion>();
  const [spellInfo, setSpellInfo] = useState<string>("");
  const [fadeData, setFadeData] = useState<string>("");
  const [fade, setFade] = useState<boolean>(true);

  const { loading } = useSelector((state: RootState) => state.champsReducer);

  useEffect(() => {
    dispatch(fetchChamps("http://localhost:3001/data"));
  }, [dispatch]);

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
      : "Error";
    return spellOrPassiveDescr;
  };

  const renderStats = (champion: Champion) => {
    const stats = Object.entries(champion.stats).map(([key, value]) => (
      <div className="stats__section" key={key}>
        <div className="stats__descr-name">
          <img src={`/assets/statsIcons/${key}.webp`} alt="" />
          <p>{statNames[key]}</p>
        </div>
        <p className="stats__descr-value">{value}</p>
      </div>
    ));
    return stats;
  };

  console.log(champData);

  const renderAbilities = (champ: Champion): JSX.Element => {
    return (
      /// PASSIVE

      <div className="container">
        <div className="spell-container">
          <div
            className="spell__passive"
            onClick={() => onSpellClick(champ.passive.name)}
          >
            <img
              className={`spell ${spellInfo === champ.passive.name ? "spell__active" : ""}`}
              src={require(
                `../../assets/passiveIcons/${champ.passive.image.full}`
              )}
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
                className={`spell ${spellInfo === spell.id ? "spell__active" : ""}`}
                src={require(`../../assets/spellIcons/${spell.id}.png`)}
                alt={spell.id}
              />
              <div className="spell__label">{spell.id.slice(-1)}</div>
            </div>
          ))}
        </div>
        <div className="second-spell-devider"></div>
        <CSSTransition timeout={500} classNames="fade" unmountOnExit in={fade}>
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

  return (
    <div className="stats">
      <div className="stats__img">
        <img src={`../../assets/champSplash/${champId}_0.jpg`} alt="" />
      </div>
      <div className="stats__header">Base statistics</div>
      <div className="stats__descr">
        {champion ? renderStats(champion) : "ERROR"}
      </div>
      {champion ? renderAbilities(champion) : "ERROR"}
    </div>
  );
};

export default ChampPage;
