package edu.miu.cs489.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BudgetDTO {
    private Long id;
    private String category;
    private double amount;
    private String period;
    private String description;
    private Long userId;
}
