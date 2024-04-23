package edu.miu.cs489.expensetracker.service;

import edu.miu.cs489.expensetracker.dto.FinancialGoalDTO;

import java.util.List;

public interface FinancialGoalService {
    FinancialGoalDTO getFinancialGoalById(Long id);

    List<FinancialGoalDTO> getAllFinancialGoalsByUserId(Long userId);

    FinancialGoalDTO createFinancialGoal(FinancialGoalDTO financialGoalDTO);

    FinancialGoalDTO updateFinancialGoal(Long id, FinancialGoalDTO financialGoalDTO);

    void deleteFinancialGoal(Long id);
}
