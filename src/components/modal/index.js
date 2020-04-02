import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { setAddData } from "./../../redux/actions/contactActions";


class ModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      contactName: null,
      photo: null,
      phone: null,
      email: null,
      address: null,
      localId:null
    };
    // this.submitForm = this.submitForm.bind(this);
  }
  handleClose() {
    this.props.close();
  }

  
  handleSave() {
    let data = {
      id:this.state.localId && this.state.localId,
      contactName: this.state.contactName,
      photo: this.state.photo,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address
    };
    this.props.setAddData(data);
    this.handleClose();
  }
  uploadImage = element => {
    const id= new Date().getUTCMilliseconds();
    this.setState({localId:id});
    var file = element.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      localStorage.setItem(id, reader.result);
    };
    reader.readAsDataURL(file);
    this.props.reader(reader.onloadend);
  };

  render() {
    const { show } = this.props;
    return (
      <div>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Create</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Customer Name"
              type="string"
              fullWidth
              onChange={e => {
                this.setState({ contactName: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Address"
              label="Address"
              type="string"
              fullWidth
              onChange={e => {
                this.setState({ address: e.target.value });
              }}
            />

            <TextField
              autoFocus
              margin="dense"
              id="Phone"
              label="Phone"
              type="number"
              fullWidth
              onChange={e => {
                this.setState({ phone: e.target.value });
              }}
            />
           
            <input
              ref={fileInput => (this.fileInput = fileInput)}
              type="file"
              className="uploadImage"
              onChange={evt => this.uploadImage(evt)}
            />
            <div className="mt-2">
              <Button
                variant="outline-success"
                onClick={this.handleSave.bind(this)}
              >
                save
              </Button>
              <span className="ml-3">
                <Button
                  variant="outline-danger"
                  onClick={this.handleClose.bind(this)}
                >
                  Close
                </Button>
              </span>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAddData: data => dispatch(setAddData(data))
});

export default connect(
  null,
  mapDispatchToProps
)(ModalView);
