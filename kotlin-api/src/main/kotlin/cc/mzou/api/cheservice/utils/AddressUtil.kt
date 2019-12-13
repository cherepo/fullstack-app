package cc.mzou.api.cheservice.utils

import cc.mzou.api.cheservice.entity.AddressEntity
import org.springframework.stereotype.Service

@Service
class AddressUtil {
    fun formatAddress(
            addressEntity: AddressEntity
    ): String {
        return "${addressEntity.buildingName} ${addressEntity.streetNumber} ${addressEntity.streetName}, ${addressEntity.suburb}, ${addressEntity.postcode}";
    }
}
