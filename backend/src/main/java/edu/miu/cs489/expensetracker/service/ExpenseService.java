package edu.miu.cs489.expensetracker.service;

import edu.miu.cs489.expensetracker.dto.ExpenseDTO;

import java.util.List;

public interface ExpenseService {
    ExpenseDTO getExpenseById(Long id);

    List<ExpenseDTO> getAllExpensesByUserId(Long userId);

    ExpenseDTO addExpense(ExpenseDTO expenseDTO);

    ExpenseDTO updateExpense(Long id, ExpenseDTO expenseDTO);

    void deleteExpense(Long id);
}
