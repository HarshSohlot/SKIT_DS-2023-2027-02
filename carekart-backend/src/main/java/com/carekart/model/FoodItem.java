package com.carekart.model;

import CareKart.Model.Enum.FoodItemType;
import CareKart.Model.Enum.OilType;
import CareKart.Model.Enum.QuantityUnit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodItem {
    private String foodItemName ;
    private FoodItemType foodItemType ;
    private int quantity ;
    private QuantityUnit quantityUnit ;
    private List<String> ingridientsList ;
    private String cookingTime ;
    private OilType oilUsed ;
    private String expiryTime ;
    private byte[] foodPicture ;
}
