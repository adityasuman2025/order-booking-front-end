import React, {Component} from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SnackBar extends Component {
    constructor(){
        super();
    }

//rendering
    render() {
        return (
            <Snackbar open={ this.props.open } autoHideDuration={ 6000 } onClose={ this.props.handleClose }>
                <Alert onClose={ this.props.handleClose } severity={ this.props.type }>
                    { this.props.msg }
                </Alert>
            </Snackbar>
        );
    }
}
  
export default SnackBar;