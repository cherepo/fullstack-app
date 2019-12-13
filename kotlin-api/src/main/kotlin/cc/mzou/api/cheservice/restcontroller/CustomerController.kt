package cc.mzou.api.cheservice.restcontroller

import cc.mzou.api.cheservice.dto.CreateUserDTO
import cc.mzou.api.cheservice.dto.CustomerDto
import cc.mzou.api.cheservice.entity.AddressEntity
import cc.mzou.api.cheservice.entity.CustomerEntity
import cc.mzou.api.cheservice.repository.CustomerRepository
import cc.mzou.api.cheservice.utils.AddressUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.Period
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMethod
import java.util.*


@RestController
@RequestMapping("/customer")
class CustomerController @Autowired constructor(
  private val repository: CustomerRepository,
  private val addressUtil: AddressUtil
){
//    Using constructor style? Or lateinit?
//    @Autowired
//    lateinit var repository: UserRepository

//    @RequestMapping("/createDummy")
//    fun process(): String{
//        repository.save(CustomerEntity(UUID.randomUUID(), "Jack", "Smith", LocalDate.parse("1980-12-12"), "test@test.com"))
//        repository.save(CustomerEntity(
//                UUID.randomUUID(),
//                "Adam",
//                "Johnson",
//                LocalDate.parse("1982-02-12"),
//                null,
//                listOf(AddressEntity(
//                    1,
//                    "3A",
//                    "200",
//                    "Adelaide Street",
//                    "Brisbane",
//                    4000
//                )
//                )))
//        repository.save(CustomerEntity(
//                UUID.randomUUID(),
//                "Kim",
//                "Smith",
//                LocalDate.parse("1980-05-29"),
//                "mailme@mail.com",
//                listOf(AddressEntity(
//                        2,
//                        "",
//                        "123",
//                        "Adelaide Street",
//                        "Brisbane",
//                        4000
//                ),AddressEntity(
//                        3,
//                        "Level 12",
//                        "38",
//                        "Laminton Terrace",
//                        "Herston",
//                        4006
//                )
//                )))
//        repository.save(CustomerEntity(UUID.randomUUID(), "David", "Williams", LocalDate.parse("1986-01-02")))
//        repository.save(CustomerEntity(UUID.randomUUID(), "Peter", "Davis", LocalDate.parse("1988-09-10")))
//        return "Done"
//    }


    @RequestMapping("/findall")
    fun findAll(): List<CustomerDto>{
        return repository.findAll().map { createDTO(it) };
    }

    @RequestMapping("/findbyid")
    fun findById(@RequestParam("id") id: Long): CustomerDto {
        val entity: CustomerEntity = repository.findById(id).get() ?: throw IllegalArgumentException("No customer with id ${id}")
        return createDTO(entity)
    }

    @RequestMapping("/findbylastname")
    fun fetchDataByLastName(@RequestParam("lastname") lastName: String): List<CustomerDto>{
        return repository.findByLastName(lastName).map { createDTO(it) }
    }

    @RequestMapping(value = "/save", method = [RequestMethod.POST])
    fun persistUser(@RequestBody user: CreateUserDTO): ResponseEntity<String> {
        val entity = CustomerEntity(id = UUID.randomUUID(), firstName = user.firstName, lastName = user.lastName, dob = user.dob)

        // A use of let !!
        // val entity = user.dob?.let { UserEntity(firstName = user.firstName, lastName = user.lastName, dob = it) }

        repository.save(entity)
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }

    private fun createDTO(entity: CustomerEntity): CustomerDto {
      val age = if (entity.dob == null) null else Period.between(entity.dob, LocalDate.now()).years
      val address = addressUtil.formatAddress(entity.address!!)
      return CustomerDto(id = entity.id!!, firstName = entity.firstName, lastName = entity.lastName, age = age, email = entity.email, address = address)
    }
}
