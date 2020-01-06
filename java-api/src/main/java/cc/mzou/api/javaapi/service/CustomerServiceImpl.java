package cc.mzou.api.javaapi.service;

import cc.mzou.api.javaapi.repository.CustomerRepository;
import cc.mzou.api.javaapi.model.Customer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
  private CustomerRepository customerRepository;
  private static final Logger log = LoggerFactory.getLogger(CustomerServiceImpl.class);

  public CustomerServiceImpl(CustomerRepository customerRepository){
    this.customerRepository = customerRepository;
  }

  @Override
  public Optional<Customer> findOne(Integer id) {
    log.info("Find user with id = " + id);
    Customer customer = customerRepository.findById(id).get();

    return customerRepository.findById(id);
  }

  @Override
  public Iterable<Customer> findAll() {
    log.info("Find all users");
    return customerRepository.findAll();
  }

  @Override
  public Customer save(Customer customer) {
    if (customer.getId() == null) {
      // Not persisted yet
      log.info("Create customer with customer name = " + customer.getFirstname());
    } else {
      log.info("Update customer with id = " + customer.getId());
    }
    return customerRepository.save(customer);
  }

  @Override
  public void delete(Customer customer) {
    log.info("Delete customer with id = " + customer.getId());
    customerRepository.delete(customer);
  }

  @Override
  public Iterable<Customer> findUserByFirstname(String firstname) {
    log.info("Find user with firstname = " + firstname);
    return customerRepository.findByFirstname(firstname);
  }
}
