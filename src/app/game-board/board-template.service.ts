import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs";

import { BoardTemplate } from "./board-template.interface";
import { Square } from "./square";

@Injectable()
export class BoardTemplateService {

  constructor(private _http: Http){
  }

  loadTemplate(templateUrl: string): Observable<BoardTemplate>{
    return this._http
      .get(templateUrl)
      .map(res =>{
        let json = res.json();

        let assign = Object.assign({}, {
          width: json.width,
          height: json.height,
          data: json.data.map(Square.fromJson)
        });

        return assign as BoardTemplate;
      })
  }
}
