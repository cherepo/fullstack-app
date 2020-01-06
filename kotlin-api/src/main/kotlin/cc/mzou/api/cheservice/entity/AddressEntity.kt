package cc.mzou.api.cheservice.entity

import javax.persistence.*

@Entity
@Table(name = "address")
data class AddressEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = -1,

    @Column(name = "buildingname")
    val buildingName: String,

    @Column(name = "streetnumber")
    val streetNumber: String,

    @Column(name = "streetname")
    val streetName: String,

    @Column
    val suburb: String,

    @Column
    val city: String,

    @Column
    val country: String,

    @Column
    val postcode: Int,

    /*
    we won't use the @JoinColumn annotation there. This is because we only need it on the
    owning side of the foreign key relationship. Simply put, whoever owns the foreign key
    column gets the @JoinColumn annotation.
     */
    @OneToOne(mappedBy = "address")
    val customer: CustomerEntity
    ) {
  override fun toString(): String{
    return "Address [id=${id}]"
  }
}
