import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
if (localStorage.getItem('usre') == null ) {
            this.props.history.push("/login");
        }
        else
        {
             this.props.history.push("/register");
        }
        this.state = {
            user: {
               name:''
            }
        };

        this.palnetsdel = this.palnetsdel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
         event.preventDefault();
        const { search } = this.state;
        const { dispatch } = this.props;
        if (event.target.value !="") {
             dispatch(userActions.search(event.target.value));
        }
       
         
    }
    palnetsdel(value)
    {

        const { search } = this.state;
        const { dispatch } = this.props;
        dispatch(userActions.palnetsdel(value));

    }

    render() {
        const { registering ,authentication } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Search</h2>
                <form name="form" onSubmit={this.handleSubmit} className="search-form">
                    
                    <div className="form-group">
                        <input typr="text" name="search" onChange={this.handleSubmit} className="form-control"/>
                      
                       <div className="showresult">
                       <ul>
                       {registering && Object.keys(registering).map((ky) => {
                        return( 
                         <li key={`mianli_${ky}`} >
                         <div key={`mianlid_${ky}`} onClick={()=>{ this.palnetsdel(registering[ky])}}>{registering[ky].name}</div>
                         </li>
                         );

                  }) }
                       </ul>
                      <div>{(authentication == undefined  || authentication == "undefined"? "":
                        <ul><li>{authentication.name}</li>
                        <li>{authentication.population}</li>
                        <li>{authentication.climate}</li>
                        <li>{authentication.created}</li>
                        ><li>{authentication.diameter}</li>
                        <li>{authentication.edited}</li>
                        <li>{authentication.gravity}</li>
                        <li>{authentication.orbital_period}</li>
                        </ul>
                        

                        )}</div>
                       
                    </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //console.log(state);
    return {
        registering : state.users.registration,
        authentication: state.users.authentication
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };