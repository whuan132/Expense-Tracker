package edu.miu.cs489.expensetracker.repository;

import edu.miu.cs489.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findAllByUserId(Long userId);
}
