const pool = require('../db');

exports.checkID = async (req, res, next, val) => {
  try {
    const id = await pool.query('SELECT id FROM loans WHERE employee_id=$1', [
      val,
    ]);
    if (id.rowCount < 1) {
      return res.status(404).json('Selected Employee owes no loan');
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Internal Server error');
  }
};

exports.checkBody = (req, res, next) => {
  try {
    const { employeeId, initialAmount, amountLeft, monthYear } = req.body;
    if (!(employeeId && initialAmount && amountLeft && monthYear)) {
      return res.status(400).json('Please provide all loan details');
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Internal Server error');
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    const departments = await pool.query(
      "SELECT CONCAT(firstname, ' ', lastname) AS full_name, initial_amount, month_year, amount_left FROM employees INNER JOIN loans ON employees.id = loans.employee_id;"
    );
    res.status(200).json(departments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Internal Server error');
  }
};

exports.createLoan = async (req, res) => {
  try {
    const { employeeId, initialAmount, amountLeft, monthYear } = req.body;
    const status = await pool.query(
      'SELECT amount_left FROM loans WHERE employee_id=$1',
      [employeeId]
    );
    if (status.rowCount === 0) {
      const newLoan = await pool.query(
        'INSERT INTO loans(employee_id, initial_amount, amount_left, month_year) VALUES($1, $2, $3, $4) RETURNING *',
        [employeeId, initialAmount, amountLeft, monthYear]
      );
      res.status(201).json(newLoan.rows[0]);
    } else if (status.rowCount > 0) {
      for (let i = 0; i < status.rows.length; i++) {
        if (status.rows[i].amount_left > 0) {
          return res.status(403).json('Employee already has a loan');
        }
      }
      const newLoan = await pool.query(
        'INSERT INTO loans(employee_id, initial_amount, amount_left, month_year) VALUES($1, $2, $3, $4) RETURNING *',
        [employeeId, initialAmount, amountLeft, monthYear]
      );
      res.status(201).json(newLoan.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Internal Server error');
  }
};

exports.updateLoan = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const { id } = req.params;
    const { amountLeft } = req.body;
    await pool.query('UPDATE loans SET amount_left=$1 WHERE employee_id=$2', [
      amountLeft,
      id,
    ]);
    res.status(200).json({ message: 'Successfully updated Loan' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Internal Server error');
  }
};
