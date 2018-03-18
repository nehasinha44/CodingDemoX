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
        dispatch(userActions.search(event.target.value));
    }
    palnetsdel(value)
    {
        const { search } = this.state;
        const { dispatch } = this.props;
        dispatch(userActions.palnetsdel(value));

    }
    logout()
    {
        const { search } = this.state;
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }
    nextdata(data)
    {
        console.log(data);
    }

    render() {
        const { registering ,authentication } = this.props;
        console.log(authentication);
        return (
            <div className="col-md-6 col-md-offset-3">
            <div className="row">
               <div className="col-3"> 
                <h2 className="float-right">Search</h2> 
               </div>
               <div className="col-3">
               <a className="float-right" onClick={()=>{ this.logout()}}>Logout</a>
               </div>
            </div>
                <form name="form" onSubmit={this.handleSubmit} className="search-form">
                    
                    <div className="form-group">
                        <input typr="text" name="search" onChange={this.handleSubmit} className="form-control"/>
                      
                       <div className="showresult">
                       <ul>
                       {registering && Object.keys(registering).map((ky) => {
                        const divStyle = {
                                  fontSize: (3*(registering.length < 5? 7:registering.length))-(ky*2)+"px"
                                };
                        return( 
                         <li key={`mianli_${ky}`} >
                         <div key={`mianlid_${ky}`} onClick={()=>{ this.palnetsdel(registering[ky])}} style={divStyle}>{registering[ky].name}</div>
                         </li>
                         );

                  }) }
                       
                       </ul>
                      <div>{(authentication == undefined  || authentication == "undefined" ? "":
                        (authentication.nexturl != "" ? (authentication.nexturl == null ? "":
                            <div>
                            <div className="next"><a>Prv</a></div>
                           <div className="next" onChange={()=>{ this.nextdata(authentication.nexturl)}}><a>Next</a></div> 
                           </div>
                            )
                            :
                      <div>
                       <p><b>name           :</b >       {authentication.detail.name}</p>
                       <p> <b>population    :</b >       {authentication.detail.population}</p>
                        <p><b>climate       :</b>        {authentication.detail.climate}</p>
                       <p> <b>created       :</b>        {authentication.detail.created}</p>
                        <p><b>diameter      :</b>        {authentication.detail.diameter}</p>
                        <p><b>edited        :</b>        {authentication.detail.edited}</p>
                       <p> <b>gravity       :</b>        {authentication.detail.gravity}</p>
                       <p> <b>orbital period :</b>       {authentication.detail.orbital_period}</p>
                       <p> <b>url            :</b>       {authentication.detail.url}</p>
                       <p> <b>terrain       :</b>        {authentication.detail.terrain}</p>
                       <p> <b>rotation period :</b>       {authentication.detail.rotation_period}</p>
                       <p> <b>surface_water   :</b>       {authentication.detail.surface_water}</p>
                       </div>
                      
                       ) )}</div>
                       
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