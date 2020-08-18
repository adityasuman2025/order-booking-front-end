import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import AdminNavBar from "../components/AdminNabBar";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

import { getDecryptedCookieValue, fetchTodaysTopBottomCities, fetchWeeklyTopBottomCities } from "../helperFunctions";

class AdminDashboard extends Component {
    constructor(){
	    super();
	   
	    this.state = {
            loading: true,

			snackBarVisible: false,
			snackBarMsg: "",
            snackBarType: "success",
			
            redirectToAdminHome: false,
            
            graphBoxHeight: 230,

            todaysTop3:     [],
            todaysBottom3:  [],
            weeklyTop3:     [],
            weeklyBottom3:  [],

            todaysTopMaxOrderCount:     1,
            todaysBottomMaxOrderCount:  1,
            weeklyTopMaxOrderCount:     1,
            weeklyBottomMaxOrderCount:  1,
        };
  	}

	componentDidMount = async () => {
    //checking if admin is logged or not
        const isAdminLogged = await getDecryptedCookieValue( "order_booking_admin_logged" );
        if( isAdminLogged != 1 ) {
        //if admin is not logged then redirecting to admin home page
            this.setState({
                redirectToAdminHome: true,
            });

            return;
        }

    //getting today's top/bottom cities and weekly top/bottom cities from api
        const response1 = await fetchTodaysTopBottomCities();
        const response2 = await fetchWeeklyTopBottomCities();
        if( response1 && response2 ) {
            const todays = response1;
            const weekly = response2;

        //getting todays top/bottom cities
            let todaysTop3 = [ ...todays ]; //copying todays array to todaysTop3 array
            todaysTop3 = todaysTop3.reverse();
            todaysTop3 = todaysTop3.slice( 0, 3 );
            
            let todaysTopMaxOrderCount = 1;
            if( todaysTop3[0] ) {
                todaysTopMaxOrderCount = todaysTop3[0].order_count;
            }

            let todaysBottom3 = todays.slice( 0, 3 );
            todaysBottom3.reverse();

            let todaysBottomMaxOrderCount = 1;
            if( todaysBottom3[0] ) {
                todaysBottomMaxOrderCount = todaysBottom3[0].order_count;
            }

        //getting weekly top/bottom cities
            let weeklyTop3 = [ ...weekly ]; //copying weekly array to weeklyTop3 array
            weeklyTop3 = weeklyTop3.reverse();
            weeklyTop3 = weeklyTop3.slice( 0, 3 );

            let weeklyTopMaxOrderCount = 1;
            if( weeklyTop3[0] ) {
                weeklyTopMaxOrderCount = weeklyTop3[0].order_count;
            }

            const weeklyBottom3 = weekly.slice( 0, 3 );
            weeklyBottom3.reverse();

            let weeklyBottomMaxOrderCount = 1;
            if( weeklyBottom3[0] ) {
                weeklyBottomMaxOrderCount = weeklyBottom3[0].order_count;
            }

        //updating state
            await this.setState({
                todaysTopMaxOrderCount:     todaysTopMaxOrderCount,
                todaysBottomMaxOrderCount:  todaysBottomMaxOrderCount,
                weeklyTopMaxOrderCount:     weeklyTopMaxOrderCount,
                weeklyBottomMaxOrderCount:  weeklyBottomMaxOrderCount,

                todaysTop3:     todaysTop3,
                todaysBottom3:  todaysBottom3,
                weeklyTop3:     weeklyTop3,
                weeklyBottom3:  weeklyBottom3,
            });
        } else {
            await this.makeSnackBar( "Something went wrong", "error" );
        }

        await this.toogleLoadingAnimation(); //hiding loading animation
    }
    
//function to make a snack-bar
    makeSnackBar = ( msg, type ) => {
        this.setState({
            snackBarVisible: true,
            snackBarMsg: msg,
            snackBarType: type,
        });
    }

//function to close snack-bar
    handleSnackBarClose = () => {
        this.setState({
            snackBarVisible: false
        });
    }

//function to toogle loadiing animation
    toogleLoadingAnimation = ( ) => {
        this.setState({
            loading: !this.state.loading,
        });
    }

//function to style graph pillar as per its order count and position
    graphPillarStyle = ( max_count, count, idx ) => {
        const graphBoxHeight = this.state.graphBoxHeight - 30 ;
        const pillarHeight = Math.floor( ( graphBoxHeight * count ) / max_count ) || 17; // min height of 17 will be there in case of max_count = 0

        if( idx == 0 ) {
            return {
                backgroundColor: "#9bf594",
                height: pillarHeight,
            }
        } else if ( idx == 1 ) {
            return {
                backgroundColor: "#f1b56e",
                height: pillarHeight,
            }
        } else {
            return {
                backgroundColor: "#e95757",
                height: pillarHeight,
            }
        }
    }

//rendering
    render() {
    //redirecting to admin home page
		if( this.state.redirectToAdminHome ) {
			return (<Redirect to={'/admin'}/>)
        }
        
    //rendering
        return (
            <div>
                <AdminNavBar active="dashboard" />
                <br/><br/><br/>
                
                <div className="row dashPageContent" >
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 dashbordPartContainer">
                        <h2>Today</h2>
                        <div className="graphContainer">
                            <h5>Top 3 Cities</h5>
                            <div className="graph" style={{ height: this.state.graphBoxHeight }}>
                                <LoadingAnimation loading={ this.state.loading } />

                                {
                                    this.state.todaysTop3.map( ( item, idx ) => {
                                        return(
                                            <div key={ idx } className="graphPillarBox">
                                                <div 
                                                    className="graphPillar" 
                                                    style={ this.graphPillarStyle( this.state.todaysTopMaxOrderCount, item.order_count, idx ) }>
                                                    { item.order_count }
                                                </div>
                                                <span className="graphPillarTitle">{ item.city_name }</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            
                            <hr />

                            <h5>Bottom 3 Cities</h5>
                            <div className="graph" style={{ height: this.state.graphBoxHeight }}>
                                <LoadingAnimation loading={ this.state.loading } />

                                {
                                    this.state.todaysBottom3.map( ( item, idx ) => {
                                        return(
                                            <div key={ idx } className="graphPillarBox">
                                                <div 
                                                    className="graphPillar" 
                                                    style={ this.graphPillarStyle( this.state.todaysBottomMaxOrderCount, item.order_count, idx ) }>
                                                    { item.order_count }
                                                </div>
                                                <span className="graphPillarTitle">{ item.city_name }</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 dashbordPartContainer">
                        <h2>Weekly</h2>
                        <div className="graphContainer">
                            <h5>Top 3 Cities</h5>
                            <div className="graph" style={{ height: this.state.graphBoxHeight }}>
                                <LoadingAnimation loading={ this.state.loading } />

                                {
                                    this.state.weeklyTop3.map( ( item, idx ) => {
                                        return(
                                            <div key={ idx } className="graphPillarBox">
                                                <div 
                                                    className="graphPillar" 
                                                    style={ this.graphPillarStyle( this.state.weeklyTopMaxOrderCount, item.order_count, idx ) }>
                                                    { item.order_count }
                                                </div>
                                                <span className="graphPillarTitle">{ item.city_name }</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <hr />

                            <h5>Bottom 3 Cities</h5>
                            <div className="graph" style={{ height: this.state.graphBoxHeight }}>
                                <LoadingAnimation loading={ this.state.loading } />

                                {
                                    this.state.weeklyBottom3.map( ( item, idx ) => {
                                        return(
                                            <div key={ idx } className="graphPillarBox">
                                                <div 
                                                    className="graphPillar" 
                                                    style={ this.graphPillarStyle( this.state.weeklyBottomMaxOrderCount, item.order_count, idx ) }>
                                                    { item.order_count }
                                                </div>
                                                <span className="graphPillarTitle">{ item.city_name }</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <SnackBar 
					open={ this.state.snackBarVisible } 
					msg={ this.state.snackBarMsg } 
					type={ this.state.snackBarType }
					handleClose={ this.handleSnackBarClose } />
            </div>
        );
    }
}

export default AdminDashboard;