[
    select('*', from(t, where([data, '@>', pgCast('{}', jsonb)]))),
];
