import { v4 as uuid } from 'uuid';

let customers = [];

export const getCustomers = (req, res) => {
    console.log(`Customers in the database: ${customers}`);

    res.send(customers);
}

export const createCustomer = (req, res) => {   
    const customer = req.body;

    customers.push({...customer, id: uuid()});
    
    res.send(`Customer ${customer.firstname} added to the database.`);
};

export const getCustomer = (req, res) => {
    const {id}=req.params;
    const foundCustomer = customers.find((customer)=>customer.id===id)
    res.send(foundCustomer);
};

export const deleteCustomer = (req, res) => { 
    res.send(`customer with id ${req.params.id} has been deleted`);
    
    customers = customers.filter((customer) => customer.id !== req.params.id);
};

export const updateCustomer =  (req,res) => {
    const customer = customers.find((customer) => customer.id === req.params.id);
    
    customer.firstname = req.body.firstname;
    customer.lastname = req.body.lastname;
    customer.age = req.body.age;
    customer.hasAppliedforLoan=req.body.hasAppliedforLoan;

    res.send(`Updated successfully`);

   
};

