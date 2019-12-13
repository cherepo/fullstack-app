package cc.mzou.api.cheservice.dto

import cc.mzou.api.cheservice.utils.UpdateField
import java.time.LocalDate
import java.util.*

data class CustomerDto(val id: UUID, val firstName: String, val lastName: String, val age: Int?, val email: String?, val address: String?)

/**
 * IDs are assigned by the persistence mechanism, so they have no place in a creation request
 */
data class CreateUserDTO(val firstName: String, val lastName: String, val dob: LocalDate? = null)

/**
 * In an update request we need the ID to look up the stored entity
 * All UpdateField properties are mandatory, but they have default values for convenience
 */
data class UpdateUserDTO(val id: Long,
                             val firstName: UpdateField<String> = UpdateField.ignore(),
                             val lastName: UpdateField<String> = UpdateField.ignore(),
                             val dob: UpdateField<LocalDate> = UpdateField.ignore())

