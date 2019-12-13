package cc.mzou.api.cheservice.entity

import javax.persistence.*

@Entity
@Table(name = "address")
class AddressEntity (
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
    val postcode: Int
    )
