package edu.miu.cs489.expensetracker.repository;

import edu.miu.cs489.expensetracker.model.FinancialGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinancialGoalRepository extends JpaRepository<FinancialGoal, Long> {
    List<FinancialGoal> findAllByUserId(Long userId);
}
