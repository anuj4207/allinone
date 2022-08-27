import { Component,OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { FreeapifetchService } from './services/freeapifetch.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'info';
  news_data:any
  sports_data:any
  today_special_data:any
  today_history_data:any
  finance_data:any=[]
  symbol:any
  snota:any
  isd=0

  constructor(private fetchdata:FreeapifetchService){
    this.symbol = ['NIFTY-50','AAPL','TESLA','GOLD','BITCOIN','CRUDE','USD/INR']
    this.snota = ['^NSEI','AAPL','TSLA','GC=F','BTC-USD','CL=F','INR=X']

  }
  sleep(ms:number){
    return new Promise(resolve=>setTimeout(resolve,ms))
  }

  fetchFinance=async()=>{
    for(let i=0;i<this.snota.length;i++){
      this.fetchdata.finance(this.snota[i]).subscribe(
      response=>{this.finance_data.push(response.data.previousClose)},
      error=>{console.log(error)}
    )
      await this.sleep(3000)
    }


  }


  fetchAll =async () => {
    this.fetchdata.news().subscribe(
      response=>{this.news_data=response.articles},
      error=>{console.log(error);
      },
      ()=>{
        console.log(this.news_data);
      }
    )
    this.fetchdata.sports().subscribe(
      resonse=>{this.sports_data=resonse.typeMatches[0].seriesMatches},
      error=>{console.log(error)},
      ()=>{
        console.log(this.sports_data);

      }
    )
    this.fetchdata.history().subscribe(
      response=>{console.log(response.articles);
      ;this.today_history_data=response.articles},
      error=>{console.log(error);}
    )
  }



  ngOnInit():void{
    this.fetchAll()
    //this.fetchFinance()

  }
}
