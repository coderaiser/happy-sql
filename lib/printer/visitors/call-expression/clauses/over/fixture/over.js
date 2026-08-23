[select(over(rowNumber(), partitionBy(kind), orderBy(id)), from(users))];
