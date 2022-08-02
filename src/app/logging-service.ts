import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    lastLog: string;

    printLog(messsage: string){
        console.log(messsage);
        console.log(this.lastLog);
        this.lastLog = messsage;
    }
}