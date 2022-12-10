import arrowUp from "../../img/upArrow.png";
import arrowDown from "../../img/downArrow.png";
import "../../style/hoverBtn.scss"

const HoverBtn = (props) => {

  return (
    <span className="hoverBlock">
      <div className="hoverBlock">
      <button className="hoverBlock__btn" onClick={props.handlerUserSortUp}>
        <img src={arrowUp} alt="arrow" className="hoverBlock__img"/>
      </button>
      <button className="hoverBlock__btn" onClick={props.handlerUserSortDown}>
        <img src={arrowDown} alt="arrow" className="hoverBlock__img"/>
      </button>
      </div>
    </span>
  );
};

export default HoverBtn;