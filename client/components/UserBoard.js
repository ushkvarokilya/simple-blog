import React, { Component } from 'react'
import {
    Button,
    Grid,
    Row,
    Thumbnail,
    Col,
    Tooltip,
    OverlayTrigger,
    Jumbotron
} from 'react-bootstrap'
import no_avatar from '../images/noavatar.jpg'
import '../css/Dashboard.css'

class UserBoard extends Component {


    render() {
        const {
            onLogOutClick,
            name,
            age,
            avatar,
            showEditModal,
            showPostModal,
            showImageUploadModal,
            isAdmin,
            showSuperUserBoard,
            isAccountDisabled
         } = this.props
        const tooltipEdit = (<Tooltip id="dashboard-tooltip">{'Click to edit'}</Tooltip>);

        return (
            <div>
                {isAccountDisabled ? <Jumbotron className="centered">
                    <h1>OOPS!</h1>
                    <p>Your account has been disabled.</p>
                    <p>
                        <Button
                            bsStyle="default"
                            onClick={onLogOutClick.bind(null)}
                            bsSize="small"
                        >
                            Go Back
                    </Button>
                    </p>
                </Jumbotron>
                    :
                    <Col sm={5}>
                        <Thumbnail src={avatar || no_avatar}>
                            <Button
                                bsStyle="default"
                                bsSize="xsmall"
                                onClick={showImageUploadModal.bind(null, true)}
                            >
                                Upload new image
                                </Button>
                            <OverlayTrigger
                                overlay={tooltipEdit}
                                placement="top"
                            >
                                <h3 onClick={showEditModal.bind(null, { show: true, message: 'name' })}>{name}</h3>
                            </OverlayTrigger>
                            <OverlayTrigger
                                overlay={tooltipEdit}
                                placement="top"
                            >
                                <p onClick={showEditModal.bind(null, { show: true, message: 'age' })}>Age: {age}</p>
                            </OverlayTrigger>
                            <p>
                                &nbsp;
                                &nbsp;
                                {isAdmin && <Button
                                    bsStyle="default"
                                    bsSize="small"
                                    onClick={showSuperUserBoard.bind(null, true)}
                                    block
                                >
                                    Manage Users
                                </Button>}
                                <Button
                                    onClick={onLogOutClick.bind(null)}
                                    bsStyle="default"
                                    bsSize="small"
                                    block
                                >
                                    Log Out
                                </Button>
                                <Button
                                    onClick={showPostModal.bind(null, { show: true })}
                                    bsStyle="default"
                                    bsSize="small"
                                    block
                                >
                                    Add A New Post
                                </Button>
                            </p>
                        </Thumbnail>
                    </Col>
                }
            </div>
        )
    }
}

export default UserBoard