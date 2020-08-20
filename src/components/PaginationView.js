import React from "react";
import classNames from "classnames";

function PaginationView(props) {
  //function to render pagination buttons
  const renderButtons = () => {
    const total_items = props.total_items;
    const pagination_size = props.pagination_size;
    const no_of_btns = Math.ceil(total_items / pagination_size); //least integer function

    if (no_of_btns < 2) return null;

    let html = [];

    let i = 0;
    for (i; i < no_of_btns; i++) {
      const index = i;

      html.push(
        <button
          key={i}
          type="button"
          className={classNames(
            "btn",
            { coloredBtn: props.active_page_no === i },
            { defaultBtn: props.active_page_no !== i }
          )}
          // className={ props.active_page_no === i ? "btn coloredBtn" : "btn defaultBtn" }
          onClick={() => props.onPaginationBtnClick(index)}
        >
          {i + 1}
        </button>
      );
    }

    return html;
  };

  //rendering
  return <center className="paginationContainer">{renderButtons()}</center>;
}

export default PaginationView;
