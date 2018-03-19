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
        this.showPaginationData = this.showPaginationData.bind(this);
    }

    handleSubmit(event) {
         event.preventDefault();
         setInterval(function(){localStorage.setItem('SearchCount', 1)}, 60000);
        const { search } = this.state;
        const { dispatch } = this.props;
         dispatch(userActions.search(event.target.value));
       
         
    }
    showPaginationData(url,event){
          event.preventDefault();
           const { dispatch } = this.props;
        dispatch(userActions.showPaginationData(url));
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

    render() {
        const { ApiData ,authentication } = this.props ;
        const registering = ApiData.results || [];
        const nextUrl = (ApiData.next) ? ApiData.next : null;
        const previous = (ApiData.previous)?ApiData.previous: null;
        return (
          <div className="container">
                  <div className="col-md-6 col-md-offset-3">
                          <div className="container">
                                <div className="row">
                                  <div className="col-md-6"> <h2 >Search</h2> </div>
                                  <div className="col-md-6"><span className="pull-right"> <a className="float-right" onClick={()=>{ this.logout()}}>Logout</a></span></div>
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
                            <div className="container">
                                  <div className="row">
                                    <div className="col-md-6">{ (previous) ? <span key="previous" onClick={ (e)=>{ this.showPaginationData(previous,e) }}  > <a>previous Page</a>   </span> : '' } </div>
                                    <div className="col-md-6"><span className="pull-right"> { (nextUrl) ? <span key="next" onClick={ (e)=>{ this.showPaginationData(nextUrl,e) }}  >  <a>Next Page </a>  </span> : '' } </span></div>
                                  </div>
                            </div>
                          </div>
                          </div>
                      </form>                 
                  </div>
                  <div className="col-md-12 col-md-offset">{
                    (authentication == undefined ? " ":(authentication.detail != "" ? <div>
                                <p> <b>name             :</b >       {authentication.detail.name}</p>
                                <p> <b>population       :</b >       {authentication.detail.population}</p>
                                <p> <b>climate          :</b>        {authentication.detail.climate}</p>
                                <p> <b>created          :</b>        {authentication.detail.created}</p>
                                <p> <b>diameter         :</b>        {authentication.detail.diameter}</p>
                                <p> <b>edited           :</b>        {authentication.detail.edited}</p>
                                <p> <b>gravity          :</b>        {authentication.detail.gravity}</p>
                                <p> <b>orbital period   :</b>        {authentication.detail.orbital_period}</p>
                                <p> <b>url              :</b>        {authentication.detail.url}</p>
                                <p> <b>terrain          :</b>        {authentication.detail.terrain}</p>
                                <p> <b>rotation period  :</b>        {authentication.detail.rotation_period}</p>
                                <p> <b>surface_water    :</b>        {authentication.detail.surface_water}</p>
                             </div>:"" )
                             )}
                      </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ApiData : state.users.registration || { ApiData : { results:[],next:null }  },
        authentication: state.users.authentication
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };