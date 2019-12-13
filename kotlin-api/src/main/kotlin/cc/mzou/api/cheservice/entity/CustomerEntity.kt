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
@Table(name = "customer")
data class CustomerEntity (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: UUID,

        @Column(name = "firstname")
        val firstName: String,

        @Column(name = "lastname")
        val lastName: String,

        @Column
        val dob: LocalDate?,

        @Column(nullable = true)
        val email: String? = null,

        @Column(nullable = true)
        @OneToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        @JoinColumn(name = "customer_id")
        val address: AddressEntity? = null
) {
    override fun toString(): String{
        return "Customer [id=${id}, firstName=${firstName}, lastName=${lastName}]"
    }
}
