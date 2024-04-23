package edu.miu.cs489.expensetracker.service.impl;

import edu.miu.cs489.expensetracker.dto.ExpenseDTO;
import edu.miu.cs489.expensetracker.exception.NotFoundException;
import edu.miu.cs489.expensetracker.model.Expense;
import edu.miu.cs489.expensetracker.repository.ExpenseRepository;
import edu.miu.cs489.expensetracker.service.ExpenseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ExpenseServiceImpl(ExpenseRepository expenseRepository, ModelMapper modelMapper) {
        this.expenseRepository = expenseRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ExpenseDTO getExpenseById(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Expense not found with id: " + id));
        return modelMapper.map(expense, ExpenseDTO.class);
    }

    @Override
    public List<ExpenseDTO> getAllExpensesByUserId(Long userId) {
        List<Expense> expenses = expenseRepository.findAllByUserId(userId);
        return expenses.stream()
                .map(expense -> modelMapper.map(expense, ExpenseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ExpenseDTO addExpense(ExpenseDTO expenseDTO) {
        Expense expense = modelMapper.map(expenseDTO, Expense.class);
        expenseRepository.save(expense);
        return modelMapper.map(expense, ExpenseDTO.class);
    }

    @Override
    public ExpenseDTO updateExpense(Long id, ExpenseDTO expenseDTO) {
        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Expense not found with id: " + id));

        // Update existing expense with new data
        existingExpense.setAmount(expenseDTO.getAmount());
        existingExpense.setDate(expenseDTO.getDate());
        existingExpense.setCategory(expenseDTO.getCategory());
        existingExpense.setDescription(expenseDTO.getDescription());

        // Save updated expense
        Expense updatedExpense = expenseRepository.save(existingExpense);
        return modelMapper.map(updatedExpense, ExpenseDTO.class);
    }

    @Override
    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new NotFoundException("Expense not found with id: " + id);
        }
        expenseRepository.deleteById(id);
    }
}

