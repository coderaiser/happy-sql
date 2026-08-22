SELECT dept, SUM(salary) FROM emp GROUP BY dept HAVING SUM(salary) > 1000
