package cc.mzou.api.cheservice.repository

import cc.mzou.api.cheservice.entity.CustomerEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 *
 *   JpaRepository extends PagingAndSortingRepository which in turn extends CrudRepository.
 *
 *   Their main functions are:
 *
 *   - CrudRepository mainly provides CRUD functions.
 *   - PagingAndSortingRepository provides methods to do pagination and sorting records.
 *   - JpaRepository provides some JPA-related methods such as flushing the persistence context and deleting records in a batch.
 */
@Repository
interface CustomerRepository: JpaRepository<CustomerEntity, Int> {
    fun findByLastName(lastName: String): List<CustomerEntity>
    fun findByFirstName(FirstName: String): List<CustomerEntity>
    override fun findAll(): List<CustomerEntity>
}
