package cc.mzou.api.javaapi.repository;

import cc.mzou.api.javaapi.model.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/*
CRUD methods of CrudRepository are transactional by default. They are annotated with
@Transactional annotation with default settings in implementation class at runtime.
For reading operation readOnly flag is set to true. To override default transactional
settings of any CrudRepository methods we need to override that method in our interface
and annotate with @Transactional using required configurations.
 */

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Integer> {
  /*
  a. We can start our query method names with find...By, read...By, query...By, count...By, and get...By. Before By we can add expression such as Distinct . After By we need to add property names of our entity.
  b. To get data on the basis of more than one property we can concatenate property names using And and Or while creating method names.
  c. If we want to use completely custom name for our method, we can use @Query annotation to write query.
   */
  Iterable<Customer> findByFirstname(String firstname);
  Iterable<Customer> findByFirstnameAndLastname(String firstname, String lastname);
  @Query("SELECT a FROM Customer a WHERE a.email=:email and a.firstname=:firstname")
  List<Customer> fetchCustomers(@Param("email") String email, @Param("firstname") String firstname);
}
