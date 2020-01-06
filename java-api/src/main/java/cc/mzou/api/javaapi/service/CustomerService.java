package cc.mzou.api.javaapi.service;

import cc.mzou.api.javaapi.model.Customer;

import java.util.Optional;

public interface CustomerService {

  Optional<Customer> findOne(Integer id);

  Iterable<Customer> findAll();

  Customer save(Customer user);

  void delete(Customer user);

  Iterable<Customer> findUserByFirstname(String firstname);
}
