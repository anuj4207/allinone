import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreeapifetchService {

  constructor(private http:HttpClient) {}

  news():Observable<any>{
      return this.http.get('https://google-news1.p.rapidapi.com/topic-headlines',{
      'headers': {
        'X-RapidAPI-Key': '72e41f7210mshb7aa3353f227312p13a8fdjsn0f176cfaf2ec',
        'X-RapidAPI-Host': 'google-news1.p.rapidapi.com'},
      'params':{
        topic: 'WORLD', country: 'IN', lang: 'en-IN', limit: '50'}}).
        pipe(catchError(this.handleError))
      }

  sports():Observable<any>{
    return this.http.get('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',{
      'headers':{
        'X-RapidAPI-Key': '72e41f7210mshb7aa3353f227312p13a8fdjsn0f176cfaf2ec',
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    }).pipe(catchError(this.handleError))
  }

  history():Observable<any>{
    return this.http.get('https://today-in-history.p.rapidapi.com/thisday',{
      'headers':{ 'X-RapidAPI-Key': '72e41f7210mshb7aa3353f227312p13a8fdjsn0f176cfaf2ec',
    'X-RapidAPI-Host': 'today-in-history.p.rapidapi.com'}
    }).pipe(catchError(this.handleError))
  }

  finance(symbol:string):Observable<any>{
    const encodedParams = new URLSearchParams();
    encodedParams.append("symbol", symbol);
    return this.http.post('https://yahoo-finance97.p.rapidapi.com/stock-info',encodedParams,{
      'headers':{
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '72e41f7210mshb7aa3353f227312p13a8fdjsn0f176cfaf2ec',
        'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
      }}).
      pipe(catchError(this.handleError))
  }

  private handleError(err:HttpErrorResponse):Observable<any>{
    let errMsg='';
    if(err.error instanceof Error){
      console.log('error occured',err.error.message);
      errMsg = err.error.message
    }else{
      console.log(`Backend returned error ${err.status}`);
      errMsg = err.error.message
    }
    return throwError(()=>errMsg)
  }
}
