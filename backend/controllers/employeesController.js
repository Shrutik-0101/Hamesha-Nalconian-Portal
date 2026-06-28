import Employee from '../models/employees.js';

// Get all employees (Admin)
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get retired employees
export const getRetiredEmployees = async (req, res) => {
  try {
    const retirees = await Employee.find({ status: { $in: ['Retired'] } });
    res.status(200).json(retirees);
  } catch (error) {
    console.error('Error fetching retired employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get retired employees count
export const getRetiredCount = async (req, res) => {
  try {
    const count = await Employee.countDocuments({ status: { $in: ['Retired'] } });
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching retired count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get current user's employee details
export const getMyEmployeeDetails = async (req, res) => {
  try {
    // req.user contains the user payload from the JWT token
    const { employeeNumber } = req.user;
    const employee = await Employee.findOne({ employeeId: employeeNumber });
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee details not found' });
    }
    
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching my employee details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update employee status (Admin)
export const updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Ensure status is valid (can be Active, Retired, Deceased, Resigned)
    const validStatuses = ['Active', 'Retired', 'Deceased', 'Resigned', 'USER']; // Keeping 'USER' as default fallback just in case
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const employee = await Employee.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', employee });
  } catch (error) {
    console.error('Error updating employee status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
