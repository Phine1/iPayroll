import React from 'react';
import './loans.css';

export const LoansDisplay = ({
  handleChange,
  selectData,
  employeeData,
  combined
}) => {
  return (
    <div className="loans-section">
      <form className="loan-form" onSubmit={combined}>
          <div className='title'><h5>Employee Loans Data</h5></div>
        <div className="select-name">
          <label htmlFor="employee">Select Employee</label>
          <select
            id="employee"
            name="employeeId"
            value={selectData.employeeId}
            onChange={handleChange}
            className="inputs"
            placeholder="Select Employee Name"
            required
          >
            <option value="" hidden>
              Select Employee Name
            </option>
            {employeeData &&
              employeeData.map((element, index) => {
                return (
                  <option value={element.id} key={index}>
                    {element.firstname} {element.lastname}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="select-name">
          <label htmlFor="initialAmount">Enter Loan Amount</label>
          <input
            name="initialAmount"
            id="initialAmount"
            type="text"
            value={selectData.amount}
            onChange={handleChange}
            className="inputs"
            placeholder="Enter Amount"
            required
            step="0.1"
          />
        </div>
        <div className="loan-btn">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
