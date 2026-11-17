[createTrigger(t, afterDelete(foo), [update(x, set(a === 1), where(y === OLD.id && z === OLD.z))])];
