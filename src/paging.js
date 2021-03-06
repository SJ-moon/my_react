import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import './main.css';
// import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from './services/auth.service';
import AppContainer from './AppContainer';

import Home from './Home';
import Register from './components/register';
import Login from './components/login'
import Profile from './components/Profile'
import Password from './components/password';


import Admin from './admin/admin.js';
import manage_member from './admin/manage_member.js';
import create_task from './admin/create_task.js';
import manage_task from './admin/manage_task.js';
import task_statistics from './admin/task_statistics.js';

import Evaluate from './evaluate.js'

import Scorer from './scorer/scorer.js';
import score_file from './scorer/score_file.js';
import monitor_score from './scorer/monitor_score.js';

import {Participation, Submit_page, Submit_apply, Submit_home, Submit_monitoring, Tasklist} from './submitter';

class Paging extends Component {
    constructor(props) {
        super(props);
        this.state = {login:false};
        this.checkLogin = this.checkLogin.bind(this);
    }
    componentDidMount()
    {
        this.checkLogin();
        //console.log('bye');
    }
    checkLogin(){
        if(localStorage.getItem("user") === null && this.state.login) this.setState({login:false});
        else if(localStorage.getItem('user') !== null && !this.state.login) this.setState({login:true});
    }
    render() {
        return (
            <div>
                <header className='el-header'>
                    <div className='headercontents'>
                        <Link to="/">
                            <button type='button' className='title'>PRECROWD</button>
                        </Link>
                        <div className='space'>
                        </div>
                        <AppContainer change={this.checkLogin}>
                            {this.state.login && 
                                <div className='header-right-box'>
                                    <Link to="/profile">
                                        <button type='button' className='header-right'>프로필</button>
                                    </Link>
                                    <Link to="/">
                                        <button type='button' className='header-right' onClick={() => AuthService.logout()}>로그아웃</button>
                                    </Link>
                                </div>
                            }
                            {!this.state.login && 
                                <div className='header-right-box'>
                                    <Link to="/login">
                                        <button type='button' className='header-right'>로그인</button>
                                    </Link>
                                    <Link to="/register">
                                        <button type='button' className='header-right'>회원가입</button>
                                    </Link>
                                </div>
                            }
                        </AppContainer>
                    </div>
                </header>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                <Route path="/password" component={Password} />
                
                <Route path="/admin" component={Admin} />
                <Route path="/manage_member" component={manage_member} />
                <Route path="/create_task" component={create_task} />
                <Route path="/manage_task" component={manage_task} />
                <Route path="/task_statistics" component={task_statistics} />

                <Route path="/evaluate" component={Evaluate} />

                <Route path="/scorer" component={Scorer} />
                <Route path="/score_file" component={score_file} />
                <Route path="/monitor_score" component={monitor_score} />

                <Route path = "/tasklist" component ={Tasklist}/>  
                <Route path = "/participation" component ={Participation}/>  
                <Route path = "/submit_apply" component ={Submit_apply}/>            
                <Route path = "/submittor" component={Submit_home} />
                <Route path = "/submit_page" component ={Submit_page}/>
                <Route path = "/submit_monitoring" component ={Submit_monitoring}/>      

                <Route path="/evaluationer" component={Scorer} />
                <Route path="/evaluate_file" component={score_file} />
                <Route path="/monitor_evaluation" component={monitor_score} />              


            </div>
        );
    }
}

export default Paging;