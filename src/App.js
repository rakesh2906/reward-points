import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data';

function App() {
  const [loadedData, setloadedData] = useState({});
  const [userRewards, setCalcRewards] = useState({});
  const [userTransactions, setUserTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");


  useEffect(() => {
    console.log('Help');
    setloadedData({ ...data });
    setUsers([...Object.keys(data)]);

  }, []);


  const userSelect = (value) => {
    setCurrentUser(value);
    let userData = loadedData[value];

    let monthT = {
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
        monthT[month.getMonth() + 1]['amounts'].push(userData[i]['amount']);
      }
    }
    for (let key in monthT) {
      let total_month_rewards = 0;
      for (let i = 0; i < monthT[key]['amounts'].length; i++) {
        let price = monthT[key]['amounts'][i];

        total_month_rewards = total_month_rewards + calRew(price);
      }
      monthT[key]['rewards'] = total_month_rewards;
    }
    console.log(monthT)
    setCalcRewards({ ...monthT });
    setUserTransactions([...userData]);
  };



  function calRew(price) {
    let rewards = 0;
    if (price > 100) {
      rewards = (price - 100) * 2;
    }
    if (price > 50) {
      rewards = rewards + (price - 50);
    }
    return rewards;
  
  }


  
  return (
    //username 8characters
    <div className="container bg-white">
    <div className="row">
    <div className="col-md-12">
      <div className="text-center h2 m-4 ">Rewards Dashbaord</div>
  
      <div className="select-style offset-md-4 ">
        <select className="dropdown dropdown-item col-md-4 border border-info m-5" onChange={e => userSelect(e.target.value)} value={currentUser} >
          <option value="" disabled>Select User</option>
          {users.map((item, index) => {
            return (
              <option key={index} value={item}> {item.toUpperCase()} </option>
            );
          })}
        </select>
      </div>
      {Object.keys(userRewards).length > 0 &&
        <div>
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
          <h2 className="text-center h3 m-4">{}Transactions</h2>
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
                    <td>{calRew(item["amount"])}</td>
                  </tr>
                })}
              </tbody>
            </table>
            : <div>No Transactions Found</div>}
          
        </div>
      }
      </div>
      </div>
    </ div >
  );
}

export default App;
