# CareKart AI Module — Sprint 2 EDA Insights Report

**Prepared by:** Harshit Goyal (AI/ML Developer)  
**Project ID:** SKIT/DS/2023-2027/02  
**Dataset Size:** 3000 samples  

---

## 1. Executive Summary & Problem Formulation
For the CareKart food redistribution platform (**SDG 2: Zero Hunger**), knowing whether cooked food is safe to redistribute before assigning volunteers is crucial (**Requirement FR-003**).

Our exploratory analysis investigates how food category, elapsed kitchen time, storage temperature, and packaging influence the remaining safe edible window.

---

## 2. Key Statistical Discoveries
* **Average Safe Window:** The mean remaining shelf life across all food items is **7.25 hours** (standard deviation: 7.67 hours).
* **Most Perishable Categories:** Dairy items (*Kheer, Lassi, Paneer*) and high-moisture gravies (*Chole, Butter Masala*) show the steepest deterioration curves when left above 25°C.
* **Longest Shelf-Life Categories:** Bakery bread and dry fried snacks maintain stability up to 14+ hours under ambient packaging.
* **Critical Environmental Factor:** Storage temperature exhibited a strong negative correlation with remaining shelf-life. Keeping food refrigerated (4°C–7°C) extends viability by a factor of 2.8x.

---

## 3. Numerical Summary
```
       temperature_c  humidity_percent  hours_since_cooking  moisture_level  spoilage_sensitivity  remaining_shelf_life_hours  safety_score  safe_for_donation
count        3000.00           3000.00              3000.00         3000.00               3000.00                     3000.00       3000.00            3000.00
mean           27.82             54.86                 6.22            2.11                  1.12                        7.25         42.03               0.52
std            16.69             14.57                 3.32            0.87                  0.33                        7.67         32.44               0.50
min             3.00             30.00                 0.50            1.00                  0.50                        0.00          0.00               0.00
25%             7.38             42.40                 3.30            1.00                  0.80                        0.12          1.30               0.00
50%            28.80             54.35                 6.30            2.00                  1.20                        4.70         46.40               1.00
75%            35.70             67.40                 9.10            3.00                  1.40                       11.84         70.40               1.00
max            65.00             80.00                12.00            3.00                  1.60                       24.00         97.10               1.00
```

---

## 4. Visual Evidence Generated
1. `target_distribution.png`: Histogram showing safe window frequency.
2. `shelf_life_by_category.png`: Ranked average edible duration by category.
3. `temperature_vs_shelflife.png`: Temperature impact gradient.
4. `correlation_matrix.png`: Multi-variable correlation heatmap.
