package cc.mzou.api.javaapi.controller;

import cc.mzou.api.javaapi.model.Customer;
import cc.mzou.api.javaapi.repository.CustomerRepository;
import cc.mzou.api.javaapi.service.CustomerService;
import cc.mzou.api.javaapi.service.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
class CustomerController {
  private CustomerServiceImpl customerService;

  public CustomerController(CustomerServiceImpl customerService){
    this.customerService = customerService;
  }

  @PostMapping("/customer")
  Customer create(@Valid @RequestBody Customer friend) {
    return customerService.save(friend);
  }

  @GetMapping("/customer")
  Iterable<Customer> getAllCustomers() {
    return customerService.findAll();
  }

  @GetMapping("/customer/{id}")
  Customer findById(@PathVariable Integer id) {
    return customerService.findOne(id).get();
  }

  @GetMapping("/customers/search")
  Iterable<Customer> findByQuery(
    @RequestParam(value = "firstname", required = false) String firstName) {
    if (firstName != null) {
      return customerService.findUserByFirstname(firstName);
    } else {
      return customerService.findAll();
    }
  }

//  @PutMapping("/customer")
//  Customer update(@RequestBody Customer customer) {
//    return customerService.save(customer);
//  }

  @PutMapping("/customer")
  ResponseEntity<Customer> update(@RequestBody Customer customer) {
    if(customerService.findOne(customer.getId()).isPresent()){
      return new ResponseEntity(
        customerService.save(customer),
        HttpStatus.OK
      );
    } else {
      return new ResponseEntity(customer, HttpStatus.BAD_REQUEST);
    }
  }

  @DeleteMapping("/customer/{id}")
  void delete(@PathVariable Customer customer) {
    customerService.delete(customer);
  }
}
