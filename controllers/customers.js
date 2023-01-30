import { v4 as uuid } from 'uuid';
import fs from 'fs'

let customers = [];

export const getCustomers = (req, res) => {
    const customers = getCustomerData()
    res.send(customers)
}

export const createCustomer = (req, res) => {   

    //get the existing customer data
    const existCustomers = getCustomerData();
    const customerData = req.body

    //check if the customerData fields are missing
    if (customerData.firstname == null || customerData.lastname==null || customerData.age == null || customerData.email == null || customerData.hasAppliedforLoan == null) {
        return res.status(401).send({error: true, msg: 'Customer data missing'})
    }
    
    //check if the customername exist already
    const findExist = existCustomers.find( customer => customer.email === customerData.email )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'customer already exist'})
    }
    //append the customer data
    existCustomers.push({...customerData, id: uuid()})
    //save the new customer data
    saveCustomerData(existCustomers);
    res.send({success: true, msg: 'Customer data added successfully'})
};

export const getCustomer = (req, res) => {
    const id=req.params.id;
    //get the existing customerdata
    const existCustomers = getCustomerData()

    const foundCustomer = existCustomers.find(customer =>customer.id===id)
    if (!foundCustomer) {
        return res.status(409).send({error: true, msg: 'customer does not exist'})
    }
    res.send(foundCustomer);
};

export const deleteCustomer = (req, res) => { 

    const id = req.params.id
    //get the existing customerdata
    const existCustomers = getCustomerData()
    //filter the customerdata to remove it
    const filterCustomer = existCustomers.filter( customer => customer.id !== id )
    if ( existCustomers.length === filterCustomer.length ) {
        return res.status(409).send({error: true, msg: 'customer does not exist'})
    }
    //save the filtered data
    saveCustomerData(filterCustomer)
    res.send({success: true, msg: 'Customer removed successfully'})

};

export const updateCustomer =  (req,res) => {

     //get the id from url
     const id = req.params.id

     //get the update data
     const customerData = req.body

     //get the existing customer data
     const existCustomers = getCustomerData()

     //check if the customername exist or not       
     const findExist = existCustomers.find( customer => customer.id === id )
     if (!findExist) {
         return res.status(409).send({error: true, msg: 'customer does not exist'})
     }

     //filter the customerdata
     const updateCustomer = existCustomers.filter( customer => customer.id !== id )

     //push the updated data
     updateCustomer.push({...customerData})
     //finally save it

     saveCustomerData(updateCustomer)
     res.send({success: true, msg: 'Customer data updated successfully'})


};

//read the customer data from json file
const saveCustomerData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('customers.json', stringifyData)
}
//get the customer data from json file
const getCustomerData = () => {
    const jsonData = fs.readFileSync('customers.json')
    return JSON.parse(jsonData)    
}


