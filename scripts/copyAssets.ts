import * as shell from 'shelljs';

shell.mkdir('dist');
shell.mkdir('dist/docs');
shell.cp('-R', 'src/docs', 'dist');
