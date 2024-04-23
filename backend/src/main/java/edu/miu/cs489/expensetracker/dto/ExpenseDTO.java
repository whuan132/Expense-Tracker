package edu.miu.cs489.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExpenseDTO {
    private Long id;
    private double amount;
    private LocalDate date;
    private String category;
    private String description;
    private Long userId;
}
