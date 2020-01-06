package cc.mzou.api.javaapi.repository;

import cc.mzou.api.javaapi.model.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {
  Order findByCustomerId(Integer customerId);
}
