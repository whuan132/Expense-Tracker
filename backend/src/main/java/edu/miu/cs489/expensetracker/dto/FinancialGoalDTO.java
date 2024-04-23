package edu.miu.cs489.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FinancialGoalDTO {
    private Long id;
    private String name;
    private String description;
    private double targetAmount;
    private LocalDate deadline;
    private Long userId;
}
