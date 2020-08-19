import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackBar(props) {
//rendering
    return (
        <Snackbar open={ props.open } autoHideDuration={ 6000 } onClose={ props.handleClose }>
            <Alert onClose={ props.handleClose } severity={ props.type }>
                { props.msg }
            </Alert>
        </Snackbar>
    )
}
  
export default SnackBar;