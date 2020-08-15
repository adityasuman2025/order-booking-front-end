import React, {Component} from 'react';

class PaginationView extends Component {
    constructor(){
        super();
    }

//rendering
    render() {
    //function to render buttons
        const renderButtons = () => {
            const total_items = this.props.total_items;
            const pagination_size = this.props.pagination_size;
            const no_of_btns = Math.ceil( total_items / pagination_size ); //least integer function

            let html = [];
            
            let i = 0;
            for( i; i<no_of_btns; i++ ) {
                const index = i;

                html.push( <button 
                                key={ i } 
                                type="button" 
                                className={ this.props.active_page_no == i ? "btn coloredBtn" : "btn defaultBtn" } 
                                onClick={ () => this.props.onPaginationBtnClick(index) }
                            >
                                { i + 1 }
                            </button> )
            }

            return html;
        }

    //rendering
        return (
            <center style={{ marginTop: 20 }}>
                { renderButtons() }
                
            </center>
        )
    }
  }
  
export default PaginationView;