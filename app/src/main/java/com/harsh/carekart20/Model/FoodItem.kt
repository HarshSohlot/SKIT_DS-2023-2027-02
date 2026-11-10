package com.harsh.carekart20.Model

import com.harsh.carekart20.Model.Enum.FoodItemType
import com.harsh.carekart20.Model.Enum.OilType
import com.harsh.carekart20.Model.Enum.QuantityUnit

data class FoodItem(
    val foodItemName: String,
    val foodItemType: FoodItemType,
    val quantity: Int,
    val quantityUnit: QuantityUnit,
    val ingridientsList: List<String>?,
    val cookingTime: String?,
    val oilUsed: OilType?,
    val expiryTime: String?,
    val foodPicture: String?
)