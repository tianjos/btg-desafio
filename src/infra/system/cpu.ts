import os from 'node:os';

export class CPU {
    cores() {
        return os.cpus().length
    }
}