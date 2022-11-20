import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../Components/Ui/Modal/Modal";

const withErrorHundler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          console.log(error);
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      console.log("ÇomponentWillUnmount");
      axios.interceptors.response.eject(this.resInterceptors);
      axios.interceptors.request.eject(this.reqInterceptors);
    }

    errorConfirmeHundler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Auxiliary>
          <Modal show={this.state.error} modalClose={this.errorConfirmeHundler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.porps} />
        </Auxiliary>
      );
    }
  };
};
export default withErrorHundler;
