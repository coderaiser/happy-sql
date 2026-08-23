[select('*', from(a, fullOuterJoin(b, on(a.id === b.id))))];
