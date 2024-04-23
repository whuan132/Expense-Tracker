package edu.miu.cs489.expensetracker.service;

import edu.miu.cs489.expensetracker.dto.BudgetDTO;

import java.util.List;

public interface BudgetService {
    BudgetDTO getBudgetById(Long id);

    List<BudgetDTO> getAllBudgetsByUserId(Long userId);

    BudgetDTO createBudget(BudgetDTO budgetDTO);

    BudgetDTO updateBudget(Long id, BudgetDTO budgetDTO);

    void deleteBudget(Long id);
}
