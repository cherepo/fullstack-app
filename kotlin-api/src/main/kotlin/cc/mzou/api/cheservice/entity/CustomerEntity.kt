package cc.mzou.api.cheservice.entity

import java.time.LocalDate
import java.util.*
import javax.persistence.*

/**
 * Annotation @Entity indicates that Customer is an Entity
 * and @Table specifies the primary table (name customer)
 * for the annotated @Entity.
 */
@Entity
@Table(name = "Customer")
data class CustomerEntity (
    @Id
    @Column(name = "ID")
    val id: Int = Random().nextInt(Int.MAX_VALUE),

    @Column(name = "firstname")
    val firstName: String,

    @Column(name = "lastname")
    val lastName: String,

    @Column
    val dob: LocalDate?,

    @Column(nullable = true)
    val email: String? = null,

    /*
    we need to place the @JoinColumn annotation to configure the name of the column in
    the users table that maps to the primary key in the address table.
     */
    @OneToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    val address: AddressEntity?
) {
    override fun toString(): String{
        return "Customer [id=${id}, firstName=${firstName}, lastName=${lastName}]"
    }
}
