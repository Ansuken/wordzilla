export const mergeClasses = ( ...args: (string | false | undefined | null)[]) =>
    args.filter((args) => !!args).join(' ');
