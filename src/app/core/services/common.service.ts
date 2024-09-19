
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root',
})


export class CommonService {

  constructor(private http: HttpClient, private router: Router){}

    private _eventOptions = [
      "Wedding Events",
      "Corporate Events",
      "Social Events",
      "Themed Parties",
      "Destination Events",
      "Festivals",
      "Concerts and Live Performances",
      "Trade Shows and Exhibitions",
      "Fundraisers and Charity Events",
      "Conferences and Seminars",
      "Product Launches",
      "Award Ceremonies",
      "Birthday Parties",
      "Anniversaries",
      "Sporting Events",
      "Community Events",
      "School and University Events",
      "Religious Celebrations",
      "Holiday Parties",
      "General Event Planning",
    ];

    private _editorConfig = {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
      ]
    };


    getEventTypes(){
      return this._eventOptions;
    }

    getQuillConfig(){
        return this._editorConfig;
    }

  }
