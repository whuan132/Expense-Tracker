package edu.miu.cs489.expensetracker.service.impl;

import edu.miu.cs489.expensetracker.dto.BudgetDTO;
import edu.miu.cs489.expensetracker.exception.NotFoundException;
import edu.miu.cs489.expensetracker.model.Budget;
import edu.miu.cs489.expensetracker.repository.BudgetRepository;
import edu.miu.cs489.expensetracker.service.BudgetService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetServiceImpl implements BudgetService {
    private final BudgetRepository budgetRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BudgetServiceImpl(BudgetRepository budgetRepository, ModelMapper modelMapper) {
        this.budgetRepository = budgetRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public BudgetDTO getBudgetById(Long id) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Budget not found with id: " + id));
        return modelMapper.map(budget, BudgetDTO.class);
    }

    @Override
    public List<BudgetDTO> getAllBudgetsByUserId(Long userId) {
        List<Budget> budgets = budgetRepository.findAllByUserId(userId);
        return budgets.stream()
                .map(budget -> modelMapper.map(budget, BudgetDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public BudgetDTO createBudget(BudgetDTO budgetDTO) {
        Budget budget = modelMapper.map(budgetDTO, Budget.class);
        budgetRepository.save(budget);
        return modelMapper.map(budget, BudgetDTO.class);
    }

    @Override
    public BudgetDTO updateBudget(Long id, BudgetDTO budgetDTO) {
        Budget existingBudget = budgetRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Budget not found with id: " + id));

        existingBudget.setCategory(budgetDTO.getCategory());
        existingBudget.setAmount(budgetDTO.getAmount());
        existingBudget.setPeriod(budgetDTO.getPeriod());
        existingBudget.setDescription(budgetDTO.getDescription());

        Budget updatedBudget = budgetRepository.save(existingBudget);
        return modelMapper.map(updatedBudget, BudgetDTO.class);
    }

    @Override
    public void deleteBudget(Long id) {
        if (!budgetRepository.existsById(id)) {
            throw new NotFoundException("Budget not found with id: " + id);
        }
        budgetRepository.deleteById(id);
    }
}

