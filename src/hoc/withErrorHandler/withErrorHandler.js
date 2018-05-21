import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorhandler = (WrappedComponent, axios) => {
    return class extends Component {
        state ={
            error: null
        }
        componentWillMount () {
            this.reqinterceptor = axios.interceptors.request.use(req => {
              this.setState({error: null});
              return req;
            });
            this.resinterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});

            });
        }

        componentWillUnmount() {
          axios.interceptors.request.eject(this.reqintereptor);
          axios.interceptors.response.eject(this.resintereptor);
        }

        errorConfirmedhandler = () => {
            this.setState({error: null})
        }


        render() {
            return(
                  <Aux>
                <Modal show={this.state.error}
                modalClosed={this.errorConfirmedhandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
            <WrappedComponent {...this.props} />
            </Aux>
        );

            
        }
    } 
}

export default withErrorhandler;