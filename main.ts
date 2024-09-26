interface Logger {
    /**
     * Для общей информации
     * @param m 
     */
    info(m: string): void
    /**
     * Используется, когда нужно сообщить админам, но не требует ручного вмешательства
     * @param m 
     */
    warning(m: string): void
    /**
     * Используется, когда нужно срочно исправить вручную
     * @param m 
     */
    critical(m: string): void
}

abstract class BaseLogger implements Logger {
    protected level = 1;

    info(m: string): void {
        if(this.level <= 1)
        this.log(m, this.level)
    }

    warning(m: string): void {
        if(this.level <= 2)
        this.log(m, this.level)
    }

    critical(m: string): void {
        if(this.level <= 3)
        this.log(m, this.level)
    }

    protected abstract log(m: string, level: number) : void
}

class ConsoleLogger extends BaseLogger {
    protected level = 3
    protected log(m: string, level: number) : void {
        switch (level) {
            case 1: 
                console.log(m)
                break;
            case 2: 
                console.warn(m)
                break;
            case 3: 
                console.error(m)
                break;
        }
    }
    
}

class DateConsoleLogger extends ConsoleLogger {
    protected level = 1
    private getDateMessage(m:string) :string {
        return (new Date()).toLocaleString() + ' ' + m
    }

    protected log(m: string, level: number) : void {
        super.log(this.getDateMessage(m), level)
    }
}

class Job {
    constructor(private logger: Logger){}

    run() {
        try {
            this.logger.info("Начало работы")
            
            this.logger.info("Закончено")
        } catch(e) {
            this.logger.critical('Ошибка ' + e)
        }
    }
}

const job = new Job(new DateConsoleLogger);

job.run()