import * as shell from 'shelljs';

shell.mkdir('dist/public');
shell.cp('-R', 'src/public', 'dist');
