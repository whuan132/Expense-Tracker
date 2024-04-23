package edu.miu.cs489.expensetracker.service.impl;

import edu.miu.cs489.expensetracker.dto.FinancialGoalDTO;
import edu.miu.cs489.expensetracker.exception.NotFoundException;
import edu.miu.cs489.expensetracker.model.FinancialGoal;
import edu.miu.cs489.expensetracker.repository.FinancialGoalRepository;
import edu.miu.cs489.expensetracker.service.FinancialGoalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FinancialGoalServiceImpl implements FinancialGoalService {
    private final FinancialGoalRepository financialGoalRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public FinancialGoalServiceImpl(FinancialGoalRepository financialGoalRepository, ModelMapper modelMapper) {
        this.financialGoalRepository = financialGoalRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public FinancialGoalDTO getFinancialGoalById(Long id) {
        FinancialGoal financialGoal = financialGoalRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Financial goal not found with id: " + id));
        return modelMapper.map(financialGoal, FinancialGoalDTO.class);
    }

    @Override
    public List<FinancialGoalDTO> getAllFinancialGoalsByUserId(Long userId) {
        List<FinancialGoal> financialGoals = financialGoalRepository.findAllByUserId(userId);
        return financialGoals.stream()
                .map(goal -> modelMapper.map(goal, FinancialGoalDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public FinancialGoalDTO createFinancialGoal(FinancialGoalDTO financialGoalDTO) {
        FinancialGoal financialGoal = modelMapper.map(financialGoalDTO, FinancialGoal.class);
        financialGoalRepository.save(financialGoal);
        return modelMapper.map(financialGoal, FinancialGoalDTO.class);
    }

    @Override
    public FinancialGoalDTO updateFinancialGoal(Long id, FinancialGoalDTO financialGoalDTO) {
        FinancialGoal existingGoal = financialGoalRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Financial goal not found with id: " + id));

        existingGoal.setName(financialGoalDTO.getName());
        existingGoal.setTargetAmount(financialGoalDTO.getTargetAmount());
        existingGoal.setDeadline(financialGoalDTO.getDeadline());

        FinancialGoal updatedGoal = financialGoalRepository.save(existingGoal);
        return modelMapper.map(updatedGoal, FinancialGoalDTO.class);
    }

    @Override
    public void deleteFinancialGoal(Long id) {
        if (!financialGoalRepository.existsById(id)) {
            throw new NotFoundException("Financial goal not found with id: " + id);
        }
        financialGoalRepository.deleteById(id);
    }
}

