package edu.miu.cs489.expensetracker.controller;

import edu.miu.cs489.expensetracker.dto.FinancialGoalDTO;
import edu.miu.cs489.expensetracker.service.FinancialGoalService;
import edu.miu.cs489.expensetracker.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Constants.API_VERSION + "/financial-goals")
public class FinancialGoalController {
    private final FinancialGoalService financialGoalService;

    @Autowired
    public FinancialGoalController(FinancialGoalService financialGoalService) {
        this.financialGoalService = financialGoalService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinancialGoalDTO> getFinancialGoalById(@PathVariable Long id) {
        FinancialGoalDTO financialGoalDTO = financialGoalService.getFinancialGoalById(id);
        return ResponseEntity.ok(financialGoalDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FinancialGoalDTO>> getAllFinancialGoalsByUserId(@PathVariable Long userId) {
        List<FinancialGoalDTO> financialGoals = financialGoalService.getAllFinancialGoalsByUserId(userId);
        return ResponseEntity.ok(financialGoals);
    }

    @PostMapping
    public ResponseEntity<FinancialGoalDTO> createFinancialGoal(@RequestBody FinancialGoalDTO financialGoalDTO) {
        FinancialGoalDTO createdFinancialGoal = financialGoalService.createFinancialGoal(financialGoalDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFinancialGoal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FinancialGoalDTO> updateFinancialGoal(@PathVariable Long id, @RequestBody FinancialGoalDTO financialGoalDTO) {
        FinancialGoalDTO updatedFinancialGoal = financialGoalService.updateFinancialGoal(id, financialGoalDTO);
        return ResponseEntity.ok(updatedFinancialGoal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFinancialGoal(@PathVariable Long id) {
        financialGoalService.deleteFinancialGoal(id);
        return ResponseEntity.noContent().build();
    }
}

