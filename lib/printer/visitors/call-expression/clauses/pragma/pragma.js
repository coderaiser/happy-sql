export const pragma = (path, {write, traverse}) => {
    const args = path.get('arguments');
    
    write('PRAGMA ');
    
    // func-call form: PRAGMA table_info(users)
    if (args.length === 2) {
        traverse(args[0]);
        write('(');
        traverse(args[1]);
        write(')');
        
        return;
    }
    
    // no-args, qualified or assignment form
    traverse(args[0]);
};
