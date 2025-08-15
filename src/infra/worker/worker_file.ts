import { join, resolve } from "node:path";
import { Fileable } from "./fileable.js";

export class WorkerFile implements Fileable {
    constructor(private dirName: string, private fileName: string) {}

    asPath() {
        return resolve(join(this.dirName, this.fileName));
    }
}