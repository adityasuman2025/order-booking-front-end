import React, {Component} from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SnackBar extends Component {
    constructor(){
        super();

        this.state = {
            visible: false,
            open: false,
            msg: "",
            type: "success",
        };
    }

    componentDidMount = async () => {
        if( this.props ) {
            await this.setState({
                open: this.props.open || true,
                msg: this.props.msg,
                type: this.props.type,
            });
            
            await this.setState({
                visible: true
            });
        }
    }
      
    handleClose = () => {
        this.setState({
            open: false
        });
    }

    render() {
        return (
            this.state.visible ?
                <Snackbar open={ this.state.open } autoHideDuration={ 6000 } onClose={ this.handleClose }>
                    <Alert onClose={ this.handleClose } severity={ this.state.type }>
                        { this.state.msg }
                    </Alert>
                </Snackbar>
            : null
        );
    }
  }
  
export default SnackBar;