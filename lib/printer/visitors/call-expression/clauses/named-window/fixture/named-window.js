[select(id, over(sum(x), w), from(t, namedWindow(w, orderBy(id))))];
