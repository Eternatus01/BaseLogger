"use strict";
class BaseLogger {
    constructor() {
        this.level = 1;
    }
    info(m) {
        if (this.level <= 1)
            this.log(m, this.level);
    }
    warning(m) {
        if (this.level <= 2)
            this.log(m, this.level);
    }
    critical(m) {
        if (this.level <= 3)
            this.log(m, this.level);
    }
}
class ConsoleLogger extends BaseLogger {
    constructor() {
        super(...arguments);
        this.level = 3;
    }
    log(m, level) {
        switch (level) {
            case 1:
                console.log(m);
                break;
            case 2:
                console.warn(m);
                break;
            case 3:
                console.error(m);
                break;
        }
    }
}
class DateConsoleLogger extends ConsoleLogger {
    constructor() {
        super(...arguments);
        this.level = 1;
    }
    getDateMessage(m) {
        return (new Date()).toLocaleString() + ' ' + m;
    }
    log(m, level) {
        super.log(this.getDateMessage(m), level);
    }
}
class Job {
    constructor(logger) {
        this.logger = logger;
    }
    run() {
        try {
            this.logger.info("Начало работы");
            this.logger.info("Закончено");
        }
        catch (e) {
            this.logger.critical('Ошибка ' + e);
        }
    }
}
const job = new Job(new DateConsoleLogger);
job.run();
