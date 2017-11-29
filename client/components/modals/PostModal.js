import React, { Component } from 'react'
import {
    Modal,
    Button,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap'
import '../../css/Modal.css'



class PostModal extends Component {

    onChange(target) {
        const { onChangePost } = this.props
        const { name, value } = target
        onChangePost({ [name]: value })
    }

    render() {
        const {
            onClickClosePostModal,
            onClickSavePostModal,
            temporaryPostData,
            temporaryPostTitle
        } = this.props

        return (
            <div>
                <Modal.Dialog>

                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>enter the text of the post</ControlLabel>
                                <FormControl
                                    type='text'
                                    placeholder='enter the title of the post'
                                    value={temporaryPostTitle}
                                    name='temporaryPostTitle'
                                    onChange={e => this.onChange(e.target)}
                                />
                                <FormControl
                                    componentClass={'textarea'}
                                    placeholder='enter the text of the post'
                                    value={temporaryPostData}
                                    name='temporaryPostData'
                                    onChange={e => this.onChange(e.target)}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsSize="small" onClick={onClickSavePostModal.bind(null)}>
                            Save
                        </Button>
                        <Button bsSize="small" onClick={onClickClosePostModal.bind(null, { show: false })}>
                            Cancel
                        </Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>
        )
    }

}

export default PostModal