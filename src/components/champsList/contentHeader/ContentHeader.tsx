import "./contentHeader.scss";

const ContentHeader = () => {
  return (
    <div className="content-Header">
      League of legends List of champions
      <span className="content-Header__descr">
        Welcome to the list of champs for
        <span className="colored-txt">League of Legends</span>, the multiplayer
        online battle arena game developed by{" "}
        <span className="colored-txt">Riot Games</span>
        <img
          alt="Riot Games logo icon"
          src={require("../../../assets/riotGames.svg").default}
          height="20"
        />
        .{" "}
      </span>
    </div>
  );
};

export default ContentHeader;
