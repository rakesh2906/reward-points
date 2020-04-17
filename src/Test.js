import React, { Component } from 'react';
import customerData from './CustomerData';


export default class App1 extends Component {
    constructor(props){
        super(props)
        this.state={
            customerData:{},
            users:[],
            currentUser:'',
            userRewards:{},
            userTransactions:[],
           
        }
        this.userSelect=this.userSelect.bind(this.userSelect);
        this.calRew=this.calRew.bind(this);
    }
    componentDidMount(){
        this.setState({
            customerData:({ ...customerData }),
            users:([...Object.keys(customerData)])

        })
    }
    userSelect = (value) => {
        this.setState({
            currentUser:(value)
        })
        let userData = customerData[value];
    
        let threeMonths = {
          1: {
            amounts: [],
            rewards: 0,
          },
          2: {
            amounts: [],
            rewards: 0,
          },
          3: {
            amounts: [],
            rewards: 0,
          },
        };
        for (let i = 0; i < userData.length; i++) {
            let month = new Date(userData[i]['date']);
            if (month.getMonth() + 1 === 1 || month.getMonth() + 1 === 2 || month.getMonth() + 1 === 3) {
              threeMonths[month.getMonth() + 1]['amounts'].push(userData[i]['amount']);
            }
          }
          for (let key in threeMonths) {
            let total_month_rewards = 0;
            for (let i = 0; i < threeMonths[key]['amounts'].length; i++) {
              let price = threeMonths[key]['amounts'][i];
      
              total_month_rewards = total_month_rewards + this.calRew(price);
            }
            threeMonths[key]['rewards'] = total_month_rewards;
          }
          console.log(threeMonths)
          this.setState({
            userRewards:({ ...threeMonths }),
            userTransactions:([...userData])
          })
        
    }
     calRew=(price) => {
        let rewards = 0;
        if (price > 100) {
          rewards = (price - 100) * 2;
        }
        if (price > 50) {
          rewards = rewards + (price - 50);
        }
        return rewards;
      
      }
    render() {
        const { users, userRewards, userTransactions, currentUser } = this.state
        return (
            <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center bg-info text-white  h2 p-2 m-4">
                        <strong>{currentUser} Reward Dash Borad</strong>
                      </div>
                    <div className="select-style offset-md-4 ">
                    <select className=" select-style offset-md-4 dropdown dropdown-item col-md-4 border border-info mb-4 ml-2" onChange={e => this.userSelect(e.target.value)} value={this.state.currentUser} >
                    <option value="" disabled>Select User</option>
                    {users && users.map((item, index) => {
                      return (
                        <option key={index} value={item}> {item.toUpperCase()} </option>
                      );
                    })}
                  </select>
                 </div>
                </div>
                
                {Object.keys(userRewards).length > 0 &&
                    <section className="col-md-12">
                      <table className="table table-info">
                        <thead>
                          <tr>
                            <th>Month</th>
                            <th>Rewards</th>
            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>First Month</td>
                            <td>{userRewards[1]["rewards"]}</td>
                          </tr>
                          <tr>
                            <td>Second Month</td>
                            <td>{userRewards[2]["rewards"]}</td>
                          </tr>
                          <tr>
                            <td>Third Month</td>
                            <td>{userRewards[3]["rewards"]}</td>
                          </tr>
                  
                          <tr>
                            <td><strong>Total Reward</strong></td>
                            <td><strong>{userRewards[1]["rewards"] + userRewards[2]["rewards"] + userRewards[3]["rewards"]}</strong></td>
                          </tr>
                          
                        </tbody>
                      </table>
                      <div className="text-center bg-info text-white  h2 p-2 m-4">
                        <strong>{currentUser} Transactions</strong>
                      </div>
                      {userTransactions.length > 0 ?
                        <table className="table table-info">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Rewards</th>
                            </tr>
            
                          </thead>
                          <tbody>
                            {userTransactions.map((item, index) => {
                              return <tr key={index}>
                                <td>{item["date"]}</td>
                                <td>{item["amount"]}</td>
                                <td>{this.calRew(item["amount"])}</td>
                              </tr>
                            })}
                          </tbody>
                        </table>
                        : <div>No Transactions Found</div>}
                      
                    </section>
                  }
            </div>
            </React.Fragment>
        );
    }
}
